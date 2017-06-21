package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web/i18n"
)

type fmManager struct {
	Email string `json:"email" binding:"required,email"`
	Allow bool   `json:"allow"`
}

func (p *Plugin) postStoreManagers(c *gin.Context) error {
	lang := c.MustGet(i18n.LOCALE).(string)
	var fm fmManager
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	user, err := p.Dao.GetByEmail(fm.Email)
	if err != nil {
		return err
	}
	store, err := p._manageStore(c, c.Param("id"))
	if err != nil {
		return err
	}
	role, err := p.Dao.Role(RoleManager, ResourceStore, store.ID)
	if err != nil {
		return err
	}
	if fm.Allow {
		err = p.Dao.Allow(role.ID, user.ID, 10, 0, 0)
		p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(lang, "mall.logs.apply-manager", user.Email, store.ID))
	} else {
		err = p.Dao.Deny(role.ID, user.ID)
		p.Dao.Log(user.ID, c.ClientIP(), p.I18n.T(lang, "mall.logs.deny-manager", user.Email, store.ID))
	}
	if err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{"id": user.ID, "name": user.Name, "email": user.Email})
	return nil
}

func (p *Plugin) getStoreManagers(c *gin.Context) error {
	store, err := p._manageStore(c, c.Param("id"))
	if err != nil {
		return err
	}
	users, err := p._storeManagers(store.ID)
	if err != nil {
		return err
	}
	c.JSON(http.StatusOK, users)
	return nil
}

func (p *Plugin) myStores(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	items, err := p._getMyStores(user.ID)
	if err != nil {
		return nil
	}
	c.JSON(http.StatusOK, items)
	return nil
}

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
	item, err := p._manageStore(c, c.Param("id"))
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
	item, err := p._manageStore(c, c.Param("id"))
	if err != nil {
		return err
	}
	if err := p.Db.Delete(item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
