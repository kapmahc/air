package forms

import (
	"encoding/csv"
	"fmt"

	"github.com/gin-gonic/gin"
)

// getFormExport csv?
func (p *Plugin) getFormExport(c *gin.Context) error {
	item := c.MustGet("item").(*Form)
	header, rows, err := p._exportForm(item)
	if err != nil {
		return err
	}
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=form-%d.ini", item.ID))
	c.Header("Content-Type", "text/plain; charset=utf-8")
	wrt := csv.NewWriter(c.Writer)
	wrt.Write(header)

	for _, row := range rows {
		wrt.Write(row)
	}
	wrt.Flush()
	return nil
}
