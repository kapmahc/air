package forms

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getFormReport(c *gin.Context) error {
	var item Form
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&item).Association("Fields").Find(&item.Fields).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&item).Association("Records").Find(&item.Records).Error; err != nil {
		return err
	}
	lang := c.MustGet(i18n.LOCALE).(string)
	headers := []gin.H{
		gin.H{"name": "username", "label": p.I18n.T(lang, "forms.attributes.record.username")},
		gin.H{"name": "email", "label": p.I18n.T(lang, "forms.attributes.record.email")},
		gin.H{"name": "phone", "label": p.I18n.T(lang, "forms.attributes.record.phone")},
	}
	for _, f := range item.Fields {
		headers = append(headers, gin.H{"name": f.Name, "label": f.Label})
	}

	var rows []gin.H
	for _, r := range item.Records {
		row := gin.H{
			"username": r.Username,
			"email":    r.Email,
			"phone":    r.Phone,
		}
		val := make(map[string]interface{})
		if err := json.Unmarshal([]byte(r.Value), &val); err != nil {
			return err
		}
		for _, f := range item.Fields {
			row[f.Name] = val[f.Name]
		}
		rows = append(rows, row)
	}

	c.JSON(http.StatusOK, gin.H{
		"headers": headers,
		"rows":    rows,
	})
	return nil
}
