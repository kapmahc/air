package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexLeaveWords(c *gin.Context) error {
	var items []LeaveWord
	if err := p.Db.Order("created_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmLeaveWord struct {
	Body string `json:"body" binding:"required,max=2048"`
	Type string `json:"type" binding:"required,max=16"`
}

func (p *Plugin) createLeaveWord(c *gin.Context) error {
	var fm fmLeaveWord
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	item := LeaveWord{
		Body: fm.Body,
		Type: fm.Type,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyLeaveWord(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(LeaveWord{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
