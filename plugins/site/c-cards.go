package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexCards(c *gin.Context) error {
	var items []Card
	if err := p.Db.Order("loc ASC, sort_order ASC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

type fmCard struct {
	Loc       string `json:"loc" binding:"required,max=32"`
	Title     string `json:"title" binding:"required,max=255"`
	Summary   string `json:"summary" binding:"required"`
	Type      string `json:"type" binding:"required"`
	Href      string `json:"href" binding:"required,max=255"`
	Logo      string `json:"logo" binding:"required,max=255"`
	SortOrder int    `json:"sortOrder"`
}

func (p *Plugin) createCard(c *gin.Context) error {
	var fm fmCard
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	item := Card{
		Title:     fm.Title,
		Logo:      fm.Logo,
		Href:      fm.Href,
		Summary:   fm.Summary,
		Type:      fm.Type,
		SortOrder: fm.SortOrder,
		Loc:       fm.Loc,
		Action:    "buttons.view",
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showCard(c *gin.Context) error {

	var item Card
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateCard(c *gin.Context) error {
	var fm fmCard
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&Card{}).
		Where("id = ?", c.Param("id")).
		Updates(map[string]interface{}{
			"href":       fm.Href,
			"title":      fm.Title,
			"logo":       fm.Logo,
			"sort_order": fm.SortOrder,
			"loc":        fm.Loc,
			"summary":    fm.Summary,
			"type":       fm.Type,
		}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyCard(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Card{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
