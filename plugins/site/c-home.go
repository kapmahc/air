package site

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getIntl(c *gin.Context) error {
	lang := c.Param("lang")
	zone := c.Param("zone") + "."
	items, err := p.I18n.Store.All(lang) //p.I18n.All(lang) //
	if err != nil {
		return err
	}
	intl := make(map[string]string)
	for k, v := range items {
		if strings.HasPrefix(k, zone) {
			intl[k[len(zone):]] = v
		}
	}
	c.SetCookie(i18n.LOCALE, lang, 1<<32-1, "/", "", false, false)
	c.JSON(http.StatusOK, intl)
	return nil
}

func (p *Plugin) getLocales(c *gin.Context) error {
	lang := c.Param("lang")
	items, err := p.I18n.All(lang)
	if err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) getSiteInfo(c *gin.Context) error {
	// -----------
	langs, err := p.I18n.Store.Languages()
	if err != nil {
		return err
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	data := gin.H{"locale": lng, "languages": langs}
	// -----------
	for _, k := range []string{"title", "subTitle", "keywords", "description", "copyright"} {
		data[k], _ = p.I18n.Store.Get(lng, "site."+k)
	}
	// -----------
	author := gin.H{}
	for _, k := range []string{"name", "email"} {
		author[k], _ = p.I18n.Store.Get(lng, "site.author."+k)
	}
	data["author"] = author
	// -----------
	var links []Link
	if err := p.Db.Order("loc DESC, sort_order DESC").Find(&links).Error; err != nil {
		return err
	}
	data["links"] = links
	// -----------
	var cards []Card
	if err := p.Db.Order("loc DESC, sort_order DESC").Find(&cards).Error; err != nil {
		return err
	}
	data["cards"] = cards
	// -----------
	donates := gin.H{}
	paypal := make(map[string]interface{})
	if err := p.Settings.Get("site.paypal", &paypal); err == nil {
		donates["paypal"] = paypal["donate"]
	}
	data["donates"] = donates
	// -----------
	var friendLinks []FriendLink
	if err := p.Db.Order("sort_order DESC").Find(&friendLinks).Error; err == nil {
		data["friendLinks"] = friendLinks
	}
	// -----------
	c.JSON(http.StatusOK, data)
	return nil
}

func (p *Plugin) getDonates(c *gin.Context) error {
	data := gin.H{}
	var paypal map[string]interface{}
	if err := p.Settings.Get("site.paypal", &paypal); err == nil {
		data["paypal"] = paypal["donate"]
	}
	c.JSON(http.StatusOK, data)
	return nil
}
