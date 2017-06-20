package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
)

type fmAddress struct {
	Username string `json:"username" binding:"required,max=255"`
	Zip      string `json:"zip" binding:"required,max=12"`
	Street   string `json:"street" binding:"required,max=255"`
	State    string `json:"state" binding:"required,max=32"`
	City     string `json:"city" binding:"required,max=32"`
	Country  string `json:"country" binding:"required,max=32"`
	Phone    string `json:"phone" binding:"required,max=32"`
}

func (p *Plugin) indexAddresses(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var items []Address
	if err := p.Db.Where("user_id = ?", user.ID).Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) createAddress(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var fm fmAddress
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := &Address{
		UserID:   user.ID,
		Username: fm.Username,
		Zip:      fm.Zip,
		Street:   fm.Street,
		City:     fm.City,
		State:    fm.State,
		Country:  fm.Country,
		Phone:    fm.Phone,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showAddress(c *gin.Context) error {
	item, err := p.getAddress(c)
	if err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) updateAddress(c *gin.Context) error {
	item, err := p.getAddress(c)
	if err != nil {
		return err
	}
	var fm fmAddress
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(&item).Updates(map[string]interface{}{
		"username": fm.Username,
		"zip":      fm.Zip,
		"street":   fm.Street,
		"city":     fm.City,
		"state":    fm.State,
		"country":  fm.Country,
		"phone":    fm.Phone,
	}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyAddress(c *gin.Context) error {
	item, err := p.getAddress(c)
	if err != nil {
		return err
	}
	if err := p.Db.Delete(item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) getAddress(c *gin.Context) (*Address, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var item Address
	if err := p.Db.Where("user_id = ? AND id = ?", user.ID, c.Param("id")).First(&item).Error; err != nil {
		return nil, err
	}
	return &item, nil
}
