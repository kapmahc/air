package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

func (p *Plugin) indexNotices(c *gin.Context) error {
	var items []Notice
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmNotice struct {
	Body string `form:"body" validate:"required"`
	Type string `form:"type" validate:"required,max=8"`
}

func (p *Plugin) createNotice(c *gin.Context) error {
	var fm fmNotice
	if err := c.Bind(&fm); err != nil {
		return err
	}
	item := Notice{
		Media: web.Media{Type: fm.Type, Body: fm.Body},
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showNotice(c *gin.Context) error {
	var item Notice
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateNotice(c *gin.Context) error {
	var fm fmNotice
	if err := c.Bind(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&Notice{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"body": fm.Body,
			"type": fm.Type,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyNotice(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Notice{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
