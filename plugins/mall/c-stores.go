package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
)

func (p *Plugin) indexStores(c *gin.Context) error {
	var items []Store
	if err := p.Db.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) showStore(c *gin.Context) error {
	var item Store
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmStore struct {
	Name        string `json:"name" binding:"required,max=255"`
	Type        string `json:"type" binding:"required"`
	Description string `json:"description" binding:"required"`
	Currency    string `json:"currency" binding:"required"`
	AddressID   uint   `json:"addressId"`
}

func (p *Plugin) createStore(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var fm fmStore
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := Store{
		Meta: Meta{
			Name:        fm.Name,
			Type:        fm.Type,
			Description: fm.Description,
		},
		Currency:  fm.Currency,
		AddressID: fm.AddressID,
		OwnerID:   user.ID,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateStore(c *gin.Context) error {
	item, err := p.getStore(c)
	if err != nil {
		return err
	}

	var fm fmStore
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	if err := p.Db.Model(item).Updates(map[string]interface{}{
		"name":        fm.Name,
		"description": fm.Description,
		"type":        fm.Type,
		"addressId":   fm.AddressID,
		"currency":    fm.Currency,
	}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) destroyStore(c *gin.Context) error {
	item, err := p.getStore(c)
	if err != nil {
		return err
	}
	if err := p.Db.Delete(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) getStore(c *gin.Context) (*Store, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var item Store
	if err := p.Db.Where("owner_id = ? AND id = ?", user.ID, c.Param("id")).First(&item).Error; err != nil {
		return nil, err
	}
	return &item, nil
}
