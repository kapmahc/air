package forms

import (
	"encoding/csv"
	"encoding/json"
	"fmt"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) _exportForm(f *Form) ([]string, [][]string, error) {
	header := []string{"email", "username", "phone"}
	for _, f := range f.Fields {
		header = append(header, f.Label)
	}

	var items [][]string
	for _, r := range f.Records {
		row := []string{r.Email, r.Username, r.Phone}
		val := make(map[string]interface{})
		if err := json.Unmarshal([]byte(r.Value), &val); err != nil {
			return nil, nil, err
		}
		for _, f := range f.Fields {
			row = append(row, fmt.Sprintf("%+v", val[f.Name]))
		}
		items = append(items, row)
	}

	return header, items, nil
}

// getFormExport csv?
func (p *Plugin) getFormExport(c *gin.Context) error {
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
	header, rows, err := p._exportForm(&item)
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
