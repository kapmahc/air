package forum

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	mg := rt.Group("/forums", web.Wrap(p.Jwt.MustSignInMiddleware))
	mg.GET("/my/articles", web.Wrap(p.getMyArticles))
	mg.POST("/articles", web.Wrap(p.createArticle))
	mg.POST("/articles/:id", web.Wrap(p.canEditArticle), web.Wrap(p.updateArticle))
	mg.DELETE("/articles/:id", web.Wrap(p.canEditArticle), web.Wrap(p.destroyArticle))
	mg.GET("/my/comments", web.Wrap(p.getMyArticles))
	mg.POST("/comments", web.Wrap(p.createComment))
	mg.POST("/comments/:id", web.Wrap(p.canEditComment), web.Wrap(p.updateComment))
	mg.DELETE("/comments/:id", web.Wrap(p.canEditComment), web.Wrap(p.destroyComment))

	ag := rt.Group("/forum", web.Wrap(p.Jwt.MustAdminMiddleware))
	ag.POST("/tags", web.Wrap(p.createTag))
	ag.POST("/tags/:id", web.Wrap(p.updateTag))
	ag.DELETE("/tags/:id", web.Wrap(p.destroyTag))

	ug := rt.Group("/forums")
	ug.GET("/articles", web.Wrap(p.indexArticles))
	ug.GET("/articles/:id", web.Wrap(p.showArticle))
	ug.GET("/comments", web.Wrap(p.indexComments))
	ug.GET("/comments/:id", web.Wrap(p.showComment))
	ug.GET("/tags", web.Wrap(p.indexTags))
	ug.GET("/tags/:id", web.Wrap(p.showTag))

}
