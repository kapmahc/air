package forms

import (
	"github.com/gin-gonic/gin"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.Group(func(r *h2o.Router) {
	// 	r.Crud(
	// 		"",
	// 		[]h2o.HandlerFunc{p.indexForms},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createForm},
	// 		[]h2o.HandlerFunc{p.showForm},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateForm},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyForm},
	// 	)
	//
	// 	r.POST("/{id}/apply", p.postFormApply)
	// 	r.POST("/{id}/cancel", p.postFormCancel)
	// 	r.GET("/{id}/export", p.Jwt.MustAdminMiddleware, p.getFormExport)
	// 	r.GET("/{id}/report", p.Jwt.MustAdminMiddleware, p.getFormReport)
	// }, "/forms")

}
