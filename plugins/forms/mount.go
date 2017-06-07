package forms

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	ag := rt.Group("/forms", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.POST("/", web.Wrap(p.createForm))
	ag.POST("/:id", web.Wrap(p._mustSelectForm), web.Wrap(p.updateForm))
	ag.DELETE("/:id", web.Wrap(p.destroyForm))
	ag.GET("/:id/export", web.Wrap(p.getFormExport))
	ag.GET("/:id/report", web.Wrap(p.getFormReport))

	ng := rt.Group("/forms")
	ng.GET("/", web.Wrap(p.indexForms))
	ng.GET("/:id", web.Wrap(p._mustSelectForm), web.Wrap(p.showForm))
	ng.POST("/:id/apply", web.Wrap(p.postFormApply))
	ng.POST("/:id/cancel", web.Wrap(p.postFormCancel))

}
