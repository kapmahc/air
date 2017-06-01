package vpn

import (
	"github.com/gin-gonic/gin"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.POST("/ops/vpn/users/change-password", p.postChangeUserPassword)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.POST("/users/{id}/reset-password", p.postResetUserPassword)
	// 	r.Crud(
	// 		"/users",
	// 		[]h2o.HandlerFunc{p.indexUsers},
	// 		[]h2o.HandlerFunc{p.createUser},
	// 		[]h2o.HandlerFunc{p.showUser},
	// 		[]h2o.HandlerFunc{p.updateUser},
	// 		[]h2o.HandlerFunc{p.destroyUser},
	// 	)
	//
	// 	r.GET("/logs", p.indexLogs)
	//
	// 	r.GET("/readme", p.getReadme)
	//
	// }, "/ops/vpn", p.Jwt.MustAdminMiddleware)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.POST("/auth", p.apiAuth)
	// 	r.POST("/connect", p.apiConnect)
	// 	r.POST("/disconnect", p.apiDisconnect)
	// }, "/ops/vpn/api")

}
