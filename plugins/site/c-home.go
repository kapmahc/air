package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getLocales(c *gin.Context) error {
	lang := c.Param("lang")
	items, err := p.I18n.All(lang) //p.I18n.Store.All(lang) //
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
	c.JSON(http.StatusOK, data)
	return nil
}
