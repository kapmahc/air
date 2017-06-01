package mail

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) indexAliases(c *gin.Context) error {

	var items []Alias
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}

	var domains []Domain
	if err := p.Db.Select([]string{"id", "name"}).Find(&domains).Error; err != nil {
		return err
	}
	for i := range items {
		u := &items[i]
		for _, d := range domains {
			if d.ID == u.DomainID {
				u.Domain = d
				break
			}
		}
	}

	c.JSON(http.StatusOK, items)
	return nil
}

type fmAlias struct {
	Source      string `json:"source" binding:"required,max=255"`
	Destination string `json:"destination" binding:"required,max=255"`
}

func (p *Plugin) createAlias(c *gin.Context) error {
	var fm fmAlias
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	var user User
	if err := p.Db.Where("email = ?", fm.Destination).First(&user).Error; err != nil {
		return err
	}
	item := Alias{
		Source:      fm.Source,
		Destination: fm.Destination,
		DomainID:    user.DomainID,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showAlias(c *gin.Context) error {
	var item Alias
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateAlias(c *gin.Context) error {
	var fm fmAlias
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	var item Alias
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}

	var user User
	if err := p.Db.Where("email = ?", fm.Destination).First(&user).Error; err != nil {
		return err
	}

	if err := p.Db.Model(&item).
		Updates(map[string]interface{}{
			"domain_id":   user.DomainID,
			"source":      fm.Source,
			"destination": fm.Destination,
		}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyAlias(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Alias{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
