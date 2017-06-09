package forms

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	ag := rt.Group("/forms", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.POST("/models", web.Wrap(p.createForm))
	ag.POST("/models/:id", web.Wrap(p.updateForm))
	ag.DELETE("/models/:id", web.Wrap(p.destroyForm))
	ag.GET("/models/:id/export", web.Wrap(p.getFormExport))
	ag.GET("/models/:id/report", web.Wrap(p.getFormReport))

	ng := rt.Group("/forms")
	ng.GET("/models/", web.Wrap(p.indexForms))
	ng.GET("/models/:id", web.Wrap(p.showForm))
	ng.POST("/models/:id/apply", web.Wrap(p.postFormApply))
	ng.POST("/models/:id/cancel", web.Wrap(p.postFormCancel))

}
