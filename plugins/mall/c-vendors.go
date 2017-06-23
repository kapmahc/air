package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexVendors(c *gin.Context) error {
	var items []Vendor
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) showVendor(c *gin.Context) error {
	var item Vendor
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmVendor struct {
	Name        string `json:"name" binding:"required,max=255"`
	Type        string `json:"type" binding:"required"`
	Description string `json:"description" binding:"required"`
	StoreID     uint   `json:"storeID"`
}

func (p *Plugin) createVendor(c *gin.Context) error {
	var fm Vendor
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := Tag{
		Meta: Meta{
			Name:        fm.Name,
			Type:        fm.Type,
			Description: fm.Description,
		},
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateTag(c *gin.Context) error {
	var item Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}

	var fm fmTag
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	if err := p.Db.Model(item).Updates(map[string]interface{}{
		"name":        fm.Name,
		"description": fm.Description,
		"type":        fm.Type,
	}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) destroyTag(c *gin.Context) error {
	var item Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	if err := p.Db.Delete(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
