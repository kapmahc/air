package mail

import (
	"github.com/gin-gonic/gin"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.POST("/ops/mail/users/change-password", p.postChangeUserPassword)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.Crud(
	// 		"/domains",
	// 		[]h2o.HandlerFunc{p.indexDomains},
	// 		[]h2o.HandlerFunc{p.createDomain},
	// 		[]h2o.HandlerFunc{p.showDomain},
	// 		[]h2o.HandlerFunc{p.updateDomain},
	// 		[]h2o.HandlerFunc{p.destroyDomain},
	// 	)
	//
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
	// 	r.Crud(
	// 		"/aliases",
	// 		[]h2o.HandlerFunc{p.indexAliases},
	// 		[]h2o.HandlerFunc{p.createAlias},
	// 		[]h2o.HandlerFunc{p.showAlias},
	// 		[]h2o.HandlerFunc{p.updateAlias},
	// 		[]h2o.HandlerFunc{p.destroyAlias},
	// 	)
	//
	// 	r.GET("/readme", p.getReadme)
	//
	// }, "/ops/mail", p.Jwt.MustAdminMiddleware)

}
