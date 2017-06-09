package forms

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

func (p *Plugin) indexForms(c *gin.Context) error {
	var items []Form
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) createForm(c *gin.Context) error {
	var fm fmForm
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	deadline, err := time.Parse(time.RFC3339, fm.Deadline)
	if err != nil {
		return err
	}

	item := Form{
		Title:    fm.Title,
		Deadline: deadline,
		Media: web.Media{
			Body: fm.Body,
			Type: fm.Type,
		},
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showForm(c *gin.Context) error {
	var item Form
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&item).Association("Fields").Find(&item.Fields).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmForm struct {
	Title    string `json:"title" binding:"required,max=255"`
	Deadline string `json:"deadline" binding:"required"`
	Body     string `json:"body" binding:"required"`
	Type     string `json:"type" binding:"required,max=8"`
}

func (p *Plugin) updateForm(c *gin.Context) error {
	var item Form
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}

	var fm fmForm
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	deadline, err := time.Parse(time.RFC3339, fm.Deadline)
	if err != nil {
		return err
	}

	if err := p.Db.Model(&item).Updates(map[string]interface{}{
		"title":    fm.Title,
		"type":     fm.Type,
		"body":     fm.Body,
		"deadline": deadline,
	}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyForm(c *gin.Context) error {
	id := c.Param("id")
	if err := p.Db.Where("form_id = ?", id).Delete(Field{}).Error; err != nil {
		return err
	}
	if err := p.Db.Where("form_id = ?", id).Delete(Record{}).Error; err != nil {
		return err
	}
	if err := p.Db.Where("id = ?", id).Delete(Form{}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}
