package reading

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type fmDict struct {
	Keywords string `form:"keywords" validate:"required,max=255"`
}

func (p *Plugin) postDict(c *gin.Context) error {

	var fm fmDict
	if err := c.Bind(&fm); err != nil {
		return err
	}
	rst := gin.H{}
	for _, dic := range dictionaries {
		for _, sen := range dic.Translate(fm.Keywords) {
			var items []gin.H
			for _, pat := range sen.Parts {
				items = append(items, gin.H{"type": pat.Type, "body": string(pat.Data)})
			}
			rst[dic.GetBookName()] = items
		}
	}

	c.JSON(http.StatusOK, rst)
	return nil
}
