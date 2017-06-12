package auth

import (
	"net/http"
	"time"

	"github.com/SermoDigital/jose/crypto"
	"github.com/SermoDigital/jose/jws"
	"github.com/SermoDigital/jose/jwt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/kapmahc/air/web/i18n"
)

const (
	// TOKEN token session key
	TOKEN = "token"
	// UID uid key
	UID = "uid"
	// CurrentUser current-user key
	CurrentUser = "currentUser"
	// IsAdmin is-admin key
	IsAdmin = "isAdmin"
)

//Jwt jwt helper
type Jwt struct {
	Key    []byte               `inject:"jwt.key"`
	Method crypto.SigningMethod `inject:"jwt.method"`
	Dao    *Dao                 `inject:""`
	I18n   *i18n.I18n           `inject:""`
}

//Validate check jwt
func (p *Jwt) Validate(buf []byte) (jwt.Claims, error) {
	tk, err := jws.ParseJWT(buf)
	if err != nil {
		return nil, err
	}
	if err = tk.Validate(p.Key, p.Method); err != nil {
		return nil, err
	}
	return tk.Claims(), nil
}

func (p *Jwt) parse(r *http.Request) (jwt.Claims, error) {
	tk, err := jws.ParseJWTFromRequest(r)
	if err != nil {
		return nil, err
	}
	if err = tk.Validate(p.Key, p.Method); err != nil {
		return nil, err
	}
	return tk.Claims(), nil
}

//Sum create jwt token
func (p *Jwt) Sum(cm jws.Claims, exp time.Duration) ([]byte, error) {
	kid := uuid.New().String()
	now := time.Now()
	cm.SetNotBefore(now)
	cm.SetExpiration(now.Add(exp))
	cm.Set("kid", kid)
	//TODO using kid

	jt := jws.NewJWT(cm, p.Method)
	return jt.Serialize(p.Key)
}

func (p *Jwt) getUserFromRequest(c *gin.Context) (*User, error) {
	lng := c.MustGet(i18n.LOCALE).(string)
	cm, err := p.parse(c.Request)
	if err != nil {
		return nil, err
	}
	user, err := p.Dao.GetUserByUID(cm.Get(UID).(string))
	if err != nil {
		return nil, err
	}
	if !user.IsConfirm() {
		return nil, p.I18n.E(http.StatusForbidden, lng, "auth.errors.user.not-confirm")
	}
	if user.IsLock() {
		return nil, p.I18n.E(http.StatusForbidden, lng, "auth.errors.user.is-lock")
	}
	return user, nil
}

// CurrentUserMiddleware current-user middleware
func (p *Jwt) CurrentUserMiddleware(c *gin.Context) error {
	if user, err := p.getUserFromRequest(c); err == nil {
		c.Set(CurrentUser, user)
		c.Set(IsAdmin, p.Dao.Is(user.ID, RoleAdmin))
	}
	return nil
}

// MustSignInMiddleware must-sign-in middleware
func (p *Jwt) MustSignInMiddleware(c *gin.Context) error {
	if _, ok := c.MustGet(CurrentUser).(*User); ok {
		return nil
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	return p.I18n.E(http.StatusForbidden, lng, "auth.errors.please-sign-in")
}

// MustAdminMiddleware must-admin middleware
func (p *Jwt) MustAdminMiddleware(c *gin.Context) error {
	if is, ok := c.MustGet(IsAdmin).(bool); ok && is {
		return nil
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	return p.I18n.E(http.StatusForbidden, lng, "errors.not-allow")
}
