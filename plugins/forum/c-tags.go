package forum

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexTags(c *gin.Context) error {
	var tags []Tag
	if err := p.Db.Find(&tags).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, tags)
	return nil
}

type fmTag struct {
	Name string `json:"name" binding:"required,max=255"`
}

func (p *Plugin) createTag(c *gin.Context) error {

	var fm fmTag
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	t := Tag{Name: fm.Name}
	if err := p.Db.Create(&t).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, t)
	return nil

}

func (p *Plugin) showTag(c *gin.Context) error {

	var tag Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&tag).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&tag).Association("Articles").Find(&tag.Articles).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, tag)
	return nil
}

func (p *Plugin) updateTag(c *gin.Context) error {

	var tag Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&tag).Error; err != nil {
		return err
	}

	var fm fmTag
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	if err := p.Db.Model(&tag).Update("name", fm.Name).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil

}

func (p *Plugin) destroyTag(c *gin.Context) error {
	var tag Tag
	if err := p.Db.Where("id = ?", c.Param("id")).First(&tag).Error; err != nil {
		return err
	}

	if err := p.Db.Model(&tag).Association("Articles").Clear().Error; err != nil {
		return err
	}

	if err := p.Db.Delete(&tag).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil

}
