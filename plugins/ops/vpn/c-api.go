package vpn

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

type fmSignIn struct {
	Email    string `json:"username" binding:"required,email"`
	Password string `json:"password" binding:"min=6,max=32"`
}

func (p *Plugin) apiAuth(c *gin.Context) error {
	var fm fmSignIn
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	var user User
	if err := p.Db.Where("email = ?", fm.Email).First(&user).Error; err != nil {
		return err
	}
	now := time.Now()
	if user.Enable && user.StartUp.Before(now) && user.ShutDown.After(now) {
		c.JSON(http.StatusOK, gin.H{})
		return nil
	}
	return p.I18n.E(http.StatusForbidden, lng, "ops.vpn.errors.user-is-not-available")
}

type fmStatus struct {
	Email       string  `json:"common_name" binding:"required,email"`
	TrustedIP   string  `json:"trusted_ip" binding:"required"`
	TrustedPort uint    `json:"trusted_port" binding:"required"`
	RemoteIP    string  `json:"ifconfig_pool_remote_ip" binding:"required"`
	RemotePort  uint    `json:"remote_port_1" binding:"required"`
	Received    float64 `json:"bytes_received" binding:"required"`
	Send        float64 `json:"bytes_sent" binding:"required"`
}

func (p *Plugin) apiConnect(c *gin.Context) error {
	var fm fmStatus
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	var user User
	if err := p.Db.Where("email = ?", fm.Email).First(&user).Error; err != nil {
		return err
	}
	if err := p.Db.Create(&Log{
		UserID:      user.ID,
		RemoteIP:    fm.RemoteIP,
		RemotePort:  fm.RemotePort,
		TrustedIP:   fm.TrustedIP,
		TrustedPort: fm.TrustedPort,
		Received:    fm.Received,
		Send:        fm.Send,
		StartUp:     time.Now(),
	}).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&User{}).
		Where("id = ?", user.ID).
		UpdateColumn("online", true).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) apiDisconnect(c *gin.Context) error {
	var fm fmStatus
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	var user User
	if err := p.Db.Where("email = ?", fm.Email).First(&user).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&User{}).
		Where("id = ?", user.ID).
		UpdateColumn("online", false).Error; err != nil {
		return err
	}

	if err := p.Db.
		Model(&Log{}).
		Where(
			"trusted_ip = ? AND trusted_port = ? AND user_id = ? AND shut_down IS NULL",
			fm.TrustedIP,
			fm.TrustedPort,
			user.ID,
		).Update(map[string]interface{}{
		"shut_down": time.Now(),
		"received":  fm.Received,
		"send":      fm.Send,
	}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
