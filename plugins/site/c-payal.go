package site

// https://developer.paypal.com/docs/directory/

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type fmPaypal struct {
	Donate string `json:"donate"`
}

func (p *Plugin) getAdminSitePaypal(c *gin.Context) error {
	paypal := make(map[string]interface{})
	if err := p.Settings.Get("site.paypal", &paypal); err != nil {
		paypal["donate"] = ""
	}
	c.JSON(http.StatusOK, paypal)
	return nil
}

func (p *Plugin) postAdminSitePaypal(c *gin.Context) error {
	var fm fmPaypal
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	paypal := map[string]interface{}{
		"donate": fm.Donate,
	}
	if err := p.Settings.Set("site.paypal", paypal, true); err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
