package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexFriendLinks(c *gin.Context) error {
	var items []FriendLink
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil

}

type fmFriendLink struct {
	Title     string `json:"title" binding:"required,max=255"`
	Home      string `json:"home" binding:"required,max=255"`
	Logo      string `json:"logo" binding:"required,max=255"`
	SortOrder int    `json:"sortOrder"`
}

func (p *Plugin) createFriendLink(c *gin.Context) error {
	var fm fmFriendLink
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := FriendLink{
		Title:     fm.Title,
		Logo:      fm.Logo,
		Home:      fm.Home,
		SortOrder: fm.SortOrder,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showFriendLink(c *gin.Context) error {
	var item FriendLink
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateFriendLink(c *gin.Context) error {
	var fm fmFriendLink
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&FriendLink{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"home":       fm.Home,
			"title":      fm.Title,
			"logo":       fm.Logo,
			"sort_order": fm.SortOrder,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyFriendLink(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(FriendLink{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
