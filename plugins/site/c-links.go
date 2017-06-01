package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexLinks(c *gin.Context) error {
	var items []Link
	if err := p.Db.Order("loc ASC, sort_order ASC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmLink struct {
	Label     string `form:"label" validate:"required,max=255"`
	Href      string `form:"href" validate:"required,max=255"`
	Loc       string `form:"loc" validate:"required,max=32"`
	SortOrder int    `form:"sortOrder"`
}

func (p *Plugin) createLink(c *gin.Context) error {
	var fm fmLink
	if err := c.Bind(&fm); err != nil {
		return err
	}
	item := Link{
		Label:     fm.Label,
		Href:      fm.Href,
		Loc:       fm.Loc,
		SortOrder: fm.SortOrder,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showLink(c *gin.Context) error {
	var item Link
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateLink(c *gin.Context) error {
	var fm fmLink
	if err := c.Bind(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&Link{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"loc":        fm.Loc,
			"label":      fm.Label,
			"href":       fm.Href,
			"sort_order": fm.SortOrder,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyLink(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Link{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
