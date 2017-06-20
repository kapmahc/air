package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexStores(c *gin.Context) error {
	var items []Store
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) showStore(c *gin.Context) error {
	var item Store
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmStore struct {
	Name        string `json:"name" binding:"required,max=255"`
	Type        string `json:"type" binding:"required"`
	Description string `json:"description" binding:"required"`
}
