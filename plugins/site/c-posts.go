package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

func (p *Plugin) indexPosts(c *gin.Context) error {
	var items []Post
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) showPost(c *gin.Context) error {
	var item Post
	if err := p.Db.Where("id = ? OR name = ?", c.Param("id"), c.Query("name")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmPost struct {
	Name  string `json:"name" binding:"required,max=255"`
	Title string `json:"title" binding:"required,max=255"`
	Body  string `json:"body" binding:"required"`
	Type  string `json:"type" binding:"required,max=8"`
}

func (p *Plugin) createPost(c *gin.Context) error {
	var fm fmPost
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := Post{
		Media: web.Media{Type: fm.Type, Body: fm.Body},
		Title: fm.Title,
		Name:  fm.Name,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updatePost(c *gin.Context) error {
	var fm fmPost
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&Post{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"body":  fm.Body,
			"type":  fm.Type,
			"title": fm.Title,
			"name":  fm.Name,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyPost(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Post{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
