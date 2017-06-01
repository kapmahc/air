package reading

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	ng := rt.Group("/reading")
	ng.GET("/notes", web.Wrap(p.indexNotes))
	ng.GET("/notes/:id", web.Wrap(p.showNote))
	ng.GET("/books", web.Wrap(p.indexBooks))
	ng.GET("/books/:id", web.Wrap(p.showBook))
	ng.POST("/dict", web.Wrap(p.postDict))
	ng.GET("/pages/:id/*href", web.Wrap(p.showPage))

	mg := rt.Group("/reading", web.Wrap(p.Jwt.MustSignInMiddleware))
	mg.GET("/my/notes", web.Wrap(p.getMyNotes))
	mg.POST("/notes", web.Wrap(p.createNote))
	mg.POST("/notes/:id", web.Wrap(p.canEditNote), web.Wrap(p.updateNote))
	mg.DELETE("/notes/:id", web.Wrap(p.canEditNote), web.Wrap(p.destroyNote))

	ag := rt.Group("/reading", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.GET("/status", web.Wrap(p.getStatus))
	ag.DELETE("/books/:id", web.Wrap(p.destroyBook))

}
