package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
)

func (p *Plugin) indexAdminUsers(c *gin.Context) error {
	var items []auth.User
	if err := p.Db.
		Order("last_sign_in_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}
