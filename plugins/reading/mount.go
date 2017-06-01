package reading

import (
	"github.com/gin-gonic/gin"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("/notes/my", p.Jwt.MustSignInMiddleware, p.myNotes)
	// 	r.Crud(
	// 		"/notes",
	// 		[]h2o.HandlerFunc{p.indexNotes},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.createNote},
	// 		[]h2o.HandlerFunc{p.showNote},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditNote, p.updateNote},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditNote, p.destroyNote},
	// 	)
	//
	// 	r.Crud(
	// 		"/books",
	// 		[]h2o.HandlerFunc{p.indexBooks},
	// 		nil,
	// 		[]h2o.HandlerFunc{p.showBook},
	// 		nil,
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyBook},
	// 	)
	//
	// 	r.GET("/status", p.Jwt.MustAdminMiddleware, p.getStatus)
	// 	r.POST("/dict", p.postDict)
	//
	// 	r.GET("/pages/{id}/{href:*}", p.showPage)
	//
	// }, "/reading")

}
