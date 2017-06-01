package mail

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	rt.PUT("/ops/mail/users/change-password", web.Wrap(p.postChangeUserPassword))

	ag := rt.Group("/ops/mail", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.GET("/domains", web.Wrap(p.indexDomains))
	ag.POST("/domains", web.Wrap(p.createDomain))
	ag.GET("/domains/:id", web.Wrap(p.showDomain))
	ag.POST("/domains/:id", web.Wrap(p.updateDomain))
	ag.DELETE("/domains/:id", web.Wrap(p.destroyDomain))

	ag.POST("/users/:id/reset-password", web.Wrap(p.postResetUserPassword))
	ag.GET("/users", web.Wrap(p.indexUsers))
	ag.POST("/users", web.Wrap(p.createUser))
	ag.GET("/users/:id", web.Wrap(p.showUser))
	ag.POST("/users/:id", web.Wrap(p.updateUser))
	ag.DELETE("/users/:id", web.Wrap(p.destroyUser))

	ag.GET("/aliases", web.Wrap(p.indexAliases))
	ag.POST("/aliases", web.Wrap(p.createAlias))
	ag.GET("/aliases/:id", web.Wrap(p.showAlias))
	ag.POST("/aliases/:id", web.Wrap(p.updateAlias))
	ag.DELETE("/aliases/:id", web.Wrap(p.destroyAlias))

	ag.GET("/readme", web.Wrap(p.getReadme))

}
