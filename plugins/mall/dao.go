package mall

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web/i18n"
)

const (
	// RoleManager manager role's name
	RoleManager = "manager"
	// ResourceStore store resource's name
	ResourceStore = "mall.store"
)

func (p *Plugin) _getMyStores(user uint) ([]Store, error) {
	ids, err := p.Dao.Resources(user, RoleManager, ResourceStore)
	if err != nil {
		return nil, err
	}
	var items []Store
	if err := p.Db.Where("owner_id = ?", user).Find(&items).Error; err != nil {
		return nil, err
	}
	for _, id := range ids {
		var it Store
		if err := p.Db.Where("id = ?", id).First(&it).Error; err != nil {
			return nil, err
		}
		items = append(items, it)
	}
	return items, nil
}

func (p *Plugin) _manageStore(c *gin.Context, store string) (*Store, error) {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	lng := c.MustGet(i18n.LOCALE).(string)
	var item Store
	if err := p.Db.Where("id = ?", store).First(&item).Error; err != nil {
		return nil, err
	}
	if item.OwnerID == user.ID || p.Dao.Can(user.ID, RoleManager, ResourceStore, item.ID) {
		return &item, nil
	}
	return nil, p.I18n.E(http.StatusForbidden, lng, "errors.not-allow")
}

func (p *Plugin) _storeManagers(store uint) ([]auth.User, error) {
	ids, err := p.Dao.Users(RoleManager, ResourceStore, store)
	if err != nil {
		return nil, err
	}
	var items []auth.User
	for _, id := range ids {
		var it auth.User
		if err := p.Db.Select([]string{"id", "name", "email"}).Where("id = ?", id).First(&it).Error; err != nil {
			return nil, err
		}
		items = append(items, it)
	}
	return items, nil
}
