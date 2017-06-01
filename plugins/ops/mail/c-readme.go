package mail

import (
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
)

func (p *Plugin) getReadme(c *gin.Context) error {
	c.HTML(http.StatusOK, path.Join("ops", "vpn", "readme.md"), gin.H{})
	return nil
}
