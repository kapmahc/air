package reading

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getStatus(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	data := gin.H{}
	var bc int
	if err := p.Db.Model(&Book{}).Count(&bc).Error; err != nil {
		return err
	}
	data["book"] = gin.H{
		p.I18n.T(lng, "reading.admin.status.book-count"): bc,
	}

	dict := gin.H{}
	for _, dic := range dictionaries {
		dict[dic.GetBookName()] = dic.GetWordCount()
	}
	data["dict"] = dict

	c.JSON(http.StatusOK, data)
	return nil

}
