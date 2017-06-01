package vpn

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	rg := rt.Group("/opn/vpn")
	rg.PUT("/users/change-password", web.Wrap(p.postChangeUserPassword))
	rg.POST("/auth", web.Wrap(p.apiAuth))
	rg.POST("/connect", web.Wrap(p.apiConnect))
	rg.POST("/disconnect", web.Wrap(p.apiDisconnect))

	ag := rt.Group("/ops/vpn", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.POST("/users/:id/reset-password", web.Wrap(p.postResetUserPassword))
	ag.GET("/users", web.Wrap(p.indexUsers))
	ag.POST("/users", web.Wrap(p.createUser))
	ag.GET("/users/:id", web.Wrap(p.showUser))
	ag.POST("/users/:id", web.Wrap(p.updateUser))
	ag.DELETE("/users/:id", web.Wrap(p.destroyUser))

	ag.GET("/logs", web.Wrap(p.indexLogs))

	ag.GET("/readme", web.Wrap(p.getReadme))

}
