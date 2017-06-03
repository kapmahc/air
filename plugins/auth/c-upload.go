package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// https://ant.design/components/upload/
func (p *Plugin) handleAntdUpload(c *gin.Context) error {
	a, e := p._writeAttachment(c, "file")
	if e != nil {
		return e
	}
	c.JSON(http.StatusOK, gin.H{
		"url":    a.URL,
		"uid":    a.ID,
		"status": "success",
	})
	return nil
}
