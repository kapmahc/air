package reading

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) getStatus(c *gin.Context) error {
	data := gin.H{}
	var bc int
	if err := p.Db.Model(&Book{}).Count(&bc).Error; err != nil {
		return err
	}
	data["book"] = gin.H{
		"count": bc,
	}

	dict := gin.H{}
	for _, dic := range dictionaries {
		dict[dic.GetBookName()] = dic.GetWordCount()
	}
	data["dict"] = dict

	c.JSON(http.StatusOK, data)
	return nil

}
