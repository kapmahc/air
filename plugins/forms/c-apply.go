package forms

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) _parseValues(f *Field) []interface{} {
	var items []interface{}
	for _, s := range strings.Split(f.Value, ";") {
		items = append(items, s)
	}
	return items
}

type fmApply struct {
	Records  []fmRecord `json:"records" binding:"required,max=255"`
	Username string     `json:"username" binding:"required,max=255"`
	Email    string     `json:"email" binding:"required,max=255"`
	Phone    string     `json:"phone" binding:"required,max=255"`
}

type fmRecord struct {
	Name  string `json:"name" binding:"required"`
	Value string `json:"value" binding:"required"`
}

func (p *Plugin) postFormApply(c *gin.Context) error {
	var fm fmApply
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	var item Form
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	lng := c.MustGet(i18n.LOCALE).(string)
	if item.Expire() {
		return p.I18n.E(http.StatusForbidden, lng, "forms.errors.expired")
	}
	var count int
	if err := p.Db.Model(&Record{}).Where("form_id = ? AND (phone = ? OR email = ?)", item.ID, fm.Phone, fm.Email).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return p.I18n.E(http.StatusForbidden, lng, "forms.errors.already-apply")
	}

	val, err := json.Marshal(fm.Records)
	if err != nil {
		return err
	}

	record := Record{
		Email:    fm.Email,
		Phone:    fm.Phone,
		Username: fm.Username,
		Value:    string(val),
		FormID:   item.ID,
	}
	if err := p.Db.Create(&record).Error; err != nil {
		return err
	}
	p._sendEmail(lng, &item, &record, actApply)
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
