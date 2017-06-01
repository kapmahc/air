package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getAdminLocales(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	items, err := p.I18n.Store.All(lng)
	if err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) deleteAdminLocales(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	if err := p.I18n.Store.Del(lng, c.Param("code")); err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

type fmLocale struct {
	Code    string `form:"code" validate:"required,max=255"`
	Message string `form:"message" validate:"required"`
}

func (p *Plugin) postAdminLocales(c *gin.Context) error {
	var fm fmLocale
	if err := c.Bind(&fm); err != nil {
		return err
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	if err := p.I18n.Set(lng, fm.Code, fm.Message); err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
