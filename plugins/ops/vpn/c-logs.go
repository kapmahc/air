package vpn

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

func (p *Plugin) indexLogs(c *gin.Context) error {
	var total int64
	if err := p.Db.Model(&Log{}).Count(&total).Error; err != nil {
		return err
	}
	pag := web.NewPagination(c.Request, total)

	var items []Log
	if err := p.Db.
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&items).Error; err != nil {
		return err
	}
	for _, b := range items {
		pag.Items = append(pag.Items, b)
	}
	c.JSON(http.StatusOK, pag)
	return nil
}
