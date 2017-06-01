package forum

import (
	"github.com/gin-gonic/gin"
)

// Mount web mount-points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("/articles/my", p.Jwt.MustSignInMiddleware, p.myArticles)
	// 	r.Crud(
	// 		"/articles",
	// 		[]h2o.HandlerFunc{p.indexArticles},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.createArticle},
	// 		[]h2o.HandlerFunc{p.showArticle},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditArticle, p.updateArticle},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditArticle, p.destroyArticle},
	// 	)
	//
	// 	r.GET("/comments/my", p.Jwt.MustSignInMiddleware, p.myComments)
	// 	r.Crud(
	// 		"/comments",
	// 		[]h2o.HandlerFunc{p.indexComments},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.createComment},
	// 		[]h2o.HandlerFunc{p.showComment},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditComment, p.updateComment},
	// 		[]h2o.HandlerFunc{p.Jwt.MustSignInMiddleware, p.canEditComment, p.destroyComment},
	// 	)
	//
	// 	r.Crud(
	// 		"/tags",
	// 		[]h2o.HandlerFunc{p.indexTags},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createTag},
	// 		[]h2o.HandlerFunc{p.showTag},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateTag},
	// 		[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyTag},
	// 	)
	//
	// }, "/forum")

}
