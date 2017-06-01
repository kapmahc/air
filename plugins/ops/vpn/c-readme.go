package vpn

import (
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
	"github.com/spf13/viper"
)

func (p *Plugin) getReadme(c *gin.Context) error {
	data := gin.H{}
	data["user"] = c.MustGet(auth.CurrentUser)
	data["name"] = viper.Get("server.name")
	data["home"] = web.Backend()
	data["port"] = 1194
	data["network"] = "10.18.0"

	token, err := p.generateToken(10)
	if err != nil {
		return err
	}
	data["token"] = string(token)
	c.HTML(http.StatusOK, path.Join("ops", "vpn", "readme.md"), data)
	return nil
}
