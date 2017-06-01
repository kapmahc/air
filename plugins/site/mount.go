package site

import "github.com/gin-gonic/gin"

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	// rt.GET("/locales/{lang}", p.getLocales)
	// rt.GET("/site/info", p.getSiteInfo)
	// rt.POST("/install", p.mustDatabaseEmpty, p.postInstall)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("/users", p.indexAdminUsers)
	//
	// 	r.GET("/locales", p.getAdminLocales)
	// 	r.POST("/locales", p.postAdminLocales)
	// 	r.DELETE("/locales/{:code}", p.deleteAdminLocales)
	//
	// }, "/admin", p.Jwt.MustAdminMiddleware)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("/status", p.getAdminSiteStatus)
	// 	r.POST("/info", p.postAdminSiteInfo)
	// 	r.POST("/author", p.postAdminSiteAuthor)
	// 	r.GET("/seo", p.getAdminSiteSeo)
	// 	r.POST("/seo", p.postAdminSiteSeo)
	// 	r.GET("/smtp", p.getAdminSiteSMTP)
	// 	r.POST("/smtp", p.postAdminSiteSMTP)
	// }, "/site", p.Jwt.MustAdminMiddleware)
	//
	// rt.Crud(
	// 	"/notices",
	// 	[]h2o.HandlerFunc{p.indexNotices},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createNotice},
	// 	[]h2o.HandlerFunc{p.showNotice},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateNotice},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyNotice},
	// )
	//
	// rt.Crud(
	// 	"/leave-words",
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.indexLeaveWords},
	// 	[]h2o.HandlerFunc{p.createLeaveWord},
	// 	nil,
	// 	nil,
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyLeaveWord},
	// )
	//
	// rt.Crud(
	// 	"/friend-links",
	// 	[]h2o.HandlerFunc{p.indexFriendLinks},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createFriendLink},
	// 	[]h2o.HandlerFunc{p.showFriendLink},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateFriendLink},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyFriendLink},
	// )
	//
	// rt.Crud(
	// 	"/links",
	// 	[]h2o.HandlerFunc{p.indexLinks},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createLink},
	// 	[]h2o.HandlerFunc{p.showLink},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateLink},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyLink},
	// )
	//
	// rt.Crud(
	// 	"/cards",
	// 	[]h2o.HandlerFunc{p.indexCards},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createCard},
	// 	[]h2o.HandlerFunc{p.showCard},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updateCard},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyCard},
	// )
	//
	// rt.Crud(
	// 	"/posts",
	// 	[]h2o.HandlerFunc{p.indexPosts},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.createPost},
	// 	[]h2o.HandlerFunc{p.showPost},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.updatePost},
	// 	[]h2o.HandlerFunc{p.Jwt.MustAdminMiddleware, p.destroyPost},
	// )
}
