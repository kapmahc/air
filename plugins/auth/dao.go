package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
	"github.com/kapmahc/air/web/i18n"
	"github.com/kapmahc/air/web/security"
	log "github.com/sirupsen/logrus"
)

// Dao auth dao
type Dao struct {
	Db   *gorm.DB       `inject:""`
	Hmac *security.Hmac `inject:""`
	I18n *i18n.I18n     `inject:""`
}

// SignIn set sign-in info
func (p *Dao) SignIn(lang, email, password, ip string) (*User, error) {
	user, err := p.GetByEmail(email)
	if err != nil {
		return nil, err
	}
	if !p.Hmac.Chk([]byte(password), user.Password) {
		p.Log(user.ID, ip, p.I18n.T(lang, "auth.logs.user.sign-in.failed"))
		return nil, p.I18n.E(http.StatusForbidden, lang, "auth.errors.user.email-password-not-match")
	}

	if !user.IsConfirm() {
		return nil, p.I18n.E(http.StatusForbidden, lang, "auth.errors.user.not-confirm")
	}

	if user.IsLock() {
		return nil, p.I18n.E(http.StatusForbidden, lang, "auth.errors.user.is-lock")
	}

	p.Log(user.ID, ip, p.I18n.T(lang, "auth.logs.user.sign-in.success"))
	user.SignInCount++
	user.LastSignInAt = user.CurrentSignInAt
	user.LastSignInIP = user.CurrentSignInIP
	now := time.Now()
	user.CurrentSignInAt = &now
	user.CurrentSignInIP = ip
	if err = p.Db.Model(user).Updates(map[string]interface{}{
		"last_sign_in_at":    user.LastSignInAt,
		"last_sign_in_ip":    user.LastSignInIP,
		"current_sign_in_at": user.CurrentSignInAt,
		"current_sign_in_ip": user.CurrentSignInIP,
		"sign_in_count":      user.SignInCount,
	}).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// GetUserByUID get user by uid
func (p *Dao) GetUserByUID(uid string) (*User, error) {
	var u User
	err := p.Db.Where("uid = ?", uid).First(&u).Error
	return &u, err
}

// GetByEmail get user by email
func (p *Dao) GetByEmail(email string) (*User, error) {
	var user User
	err := p.Db.
		Where("provider_type = ? AND provider_id = ?", UserTypeEmail, email).
		First(&user).Error
	return &user, err
}

// Log add log
func (p *Dao) Log(user uint, ip, message string) {
	if err := p.Db.Create(&Log{UserID: user, IP: ip, Message: message}).Error; err != nil {
		log.Error(err)
	}
}

// AddEmailUser add email user
func (p *Dao) AddEmailUser(name, email, password string) (*User, error) {

	user := User{
		Email:           email,
		Password:        p.Hmac.Sum([]byte(password)),
		Name:            name,
		ProviderType:    UserTypeEmail,
		ProviderID:      email,
		Home:            "/users",
		LastSignInIP:    "0.0.0.0",
		CurrentSignInIP: "0.0.0.0",
	}
	user.SetUID()
	user.SetGravatarLogo()
	user.Home = fmt.Sprintf("/users/%s", user.UID)

	err := p.Db.Create(&user).Error
	return &user, err
}

// Authority get roles
func (p *Dao) Authority(user uint, rty string, rid uint) []string {
	var items []Role
	if err := p.Db.
		Where("resource_type = ? AND resource_id = ?", rty, rid).
		Find(&items).Error; err != nil {
		log.Error(err)
	}
	var roles []string
	for _, r := range items {
		var pm Policy
		if err := p.Db.
			Where("role_id = ? AND user_id = ? ", r.ID, user).
			First(&pm).Error; err != nil {
			log.Error(err)
			continue
		}
		if pm.Enable() {
			roles = append(roles, r.Name)
		}
	}
	return roles
}

//Is is role ?
func (p *Dao) Is(user uint, names ...string) bool {
	for _, name := range names {
		if p.Can(user, name, "-", 0) {
			return true
		}
	}
	return false
}

//Can can?
func (p *Dao) Can(user uint, name string, rty string, rid uint) bool {
	var r Role
	if p.Db.
		Where("name = ? AND resource_type = ? AND resource_id = ?", name, rty, rid).
		First(&r).
		RecordNotFound() {
		return false
	}
	var pm Policy
	if p.Db.
		Where("user_id = ? AND role_id = ?", user, r.ID).
		First(&pm).
		RecordNotFound() {
		return false
	}

	return pm.Enable()
}

//Role check role exist
func (p *Dao) Role(name string, rty string, rid uint) (*Role, error) {
	var e error
	r := Role{}
	db := p.Db
	if db.
		Where("name = ? AND resource_type = ? AND resource_id = ?", name, rty, rid).
		First(&r).
		RecordNotFound() {
		r = Role{
			Name:         name,
			ResourceType: rty,
			ResourceID:   rid,
		}
		e = db.Create(&r).Error

	}
	return &r, e
}

//Deny deny permission
func (p *Dao) Deny(role uint, user uint) error {
	return p.Db.
		Where("role_id = ? AND user_id = ?", role, user).
		Delete(Policy{}).Error
}

//Allow allow permission
func (p *Dao) Allow(role, user uint, years, months, days int) error {
	begin := time.Now()
	end := begin.AddDate(years, months, days)
	var count int
	p.Db.
		Model(&Policy{}).
		Where("role_id = ? AND user_id = ?", role, user).
		Count(&count)
	if count == 0 {
		return p.Db.Create(&Policy{
			UserID:   user,
			RoleID:   role,
			StartUp:  begin,
			ShutDown: end,
		}).Error
	}
	return p.Db.
		Model(&Policy{}).
		Where("role_id = ? AND user_id = ?", role, user).
		UpdateColumns(map[string]interface{}{"begin": begin, "end": end}).Error

}
