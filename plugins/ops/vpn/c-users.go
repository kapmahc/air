package vpn

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) indexUsers(c *gin.Context) error {

	var items []User
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmUserNew struct {
	FullName             string `form:"fullName" validate:"required,max=255"`
	Email                string `form:"email" validate:"required,email"`
	Password             string `form:"password" validate:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" validate:"eqfield=Password"`
	Details              string `form:"details"`
	Enable               bool   `form:"enable"`
	StartUp              string `form:"startUp"`
	ShutDown             string `form:"shutDown"`
}

func (p *Plugin) createUser(c *gin.Context) error {

	var fm fmUserNew
	if err := c.Bind(&fm); err != nil {
		return err
	}
	startUp, err := time.Parse(web.FormatDateInput, fm.StartUp)
	if err != nil {
		return err
	}
	shutDown, err := time.Parse(web.FormatDateInput, fm.ShutDown)
	if err != nil {
		return err
	}
	user := User{
		FullName: fm.FullName,
		Email:    fm.Email,
		Details:  fm.Details,
		Enable:   fm.Enable,
		StartUp:  startUp,
		ShutDown: shutDown,
	}
	if err := user.SetPassword(fm.Password); err != nil {
		return err
	}
	if err := p.Db.Create(&user).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, user)
	return nil
}

func (p *Plugin) showUser(c *gin.Context) error {
	var item User
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmUserEdit struct {
	FullName string `form:"fullName" validate:"required,max=255"`
	Details  string `form:"details"`
	Enable   bool   `form:"enable"`
	StartUp  string `form:"startUp"`
	ShutDown string `form:"shutDown"`
}

func (p *Plugin) updateUser(c *gin.Context) error {
	var fm fmUserEdit
	if err := c.Bind(&fm); err != nil {
		return err
	}
	var item User
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}

	startUp, err := time.Parse(web.FormatDateInput, fm.StartUp)
	if err != nil {
		return err
	}
	shutDown, err := time.Parse(web.FormatDateInput, fm.ShutDown)
	if err != nil {
		return err
	}
	if err := p.Db.Model(&item).
		Updates(map[string]interface{}{
			"full_name": fm.FullName,
			"enable":    fm.Enable,
			"start_up":  startUp,
			"shut_down": shutDown,
			"details":   fm.Details,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

type fmUserResetPassword struct {
	Password             string `form:"password" validate:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" validate:"eqfield=Password"`
}

func (p *Plugin) postResetUserPassword(c *gin.Context) error {

	var item User
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	var fm fmUserResetPassword
	if err := c.Bind(&fm); err != nil {
		return err
	}

	if err := item.SetPassword(fm.Password); err != nil {
		return err
	}
	if err := p.Db.Model(&item).
		Updates(map[string]interface{}{
			"password": item.Password,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

type fmUserChangePassword struct {
	Email                string `form:"email" validate:"required,email"`
	CurrentPassword      string `form:"currentPassword" validate:"required"`
	NewPassword          string `form:"newPassword" validate:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" validate:"eqfield=NewPassword"`
}

func (p *Plugin) postChangeUserPassword(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	var fm fmUserChangePassword
	if err := c.Bind(&fm); err != nil {
		return err
	}
	var user User
	if err := p.Db.Where("email = ?", fm.Email).First(&user).Error; err != nil {
		return err
	}
	if !user.ChkPassword(fm.CurrentPassword) {
		return p.I18n.E(http.StatusBadRequest, lng, "ops.vpn.users.email-password-not-match")
	}
	if err := user.SetPassword(fm.NewPassword); err != nil {
		return err
	}

	if err := p.Db.Model(user).
		Updates(map[string]interface{}{
			"password": user.Password,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyUser(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(User{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
