package forms

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

type fmCancel struct {
	Who string `form:"who" validate:"required,max=255"`
}

func (p *Plugin) postFormCancel(c *gin.Context) error {
	var fm fmCancel
	if err := c.Bind(&fm); err != nil {
		return err
	}

	lng := c.MustGet(i18n.LOCALE).(string)
	item := c.MustGet("item").(*Form)

	if item.Expire() {
		return p.I18n.E(http.StatusForbidden, lng, "forms.errors.expired")
	}
	var record Record
	if err := p.Db.Where("form_id = ? AND (phone = ? OR email = ?)", item.ID, fm.Who, fm.Who).First(&record).Error; err != nil {
		return err
	}

	if err := p.Db.Delete(&record).Error; err != nil {
		return err
	}
	p._sendEmail(lng, item, &record, actCancel)
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
