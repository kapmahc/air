package mail

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexDomains(c *gin.Context) error {

	var items []Domain
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmDomain struct {
	Name string `json:"name" binding:"required,max=255"`
}

func (p *Plugin) createDomain(c *gin.Context) error {

	var fm fmDomain
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	if err := p.Db.Create(&Domain{
		Name: fm.Name,
	}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) showDomain(c *gin.Context) error {
	var item Domain
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateDomain(c *gin.Context) error {
	var fm fmDomain
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	var item Domain
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}

	if err := p.Db.Model(&item).
		Updates(map[string]interface{}{
			"name": fm.Name,
		}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyDomain(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Domain{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
