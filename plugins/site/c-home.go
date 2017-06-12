package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

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
	langs, err := p.I18n.Store.Languages()
	if err != nil {
		return err
	}

	lng := c.MustGet(i18n.LOCALE).(string)
	data := gin.H{"locale": lng, "languages": langs}

	for _, k := range []string{"title", "subTitle", "keywords", "description", "copyright"} {
		data[k] = p.I18n.T(lng, "site."+k)
	}

	author := gin.H{}
	for _, k := range []string{"name", "email"} {
		author[k] = p.I18n.T(lng, "site.author."+k)
	}
	data["author"] = author

	var links []Link
	if err := p.Db.Order("loc DESC, sort_order DESC").Find(&links).Error; err != nil {
		return err
	}
	data["links"] = links

	var cards []Card
	if err := p.Db.Order("loc DESC, sort_order DESC").Find(&cards).Error; err != nil {
		return err
	}
	data["cards"] = cards

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
