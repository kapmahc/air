package auth

import (
	"github.com/gin-gonic/gin"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {

	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("", p.indexUsers)
	// 	r.POST("/sign-up", p.postUsersSignUp)
	// 	r.POST("/sign-in", p.postUsersSignIn)
	// 	r.GET("/confirm/{token}", p.getUsersConfirm)
	// 	r.POST("/confirm", p.postUsersConfirm)
	// 	r.GET("/unlock/{token}", p.getUsersUnlock)
	// 	r.POST("/unlock", p.postUsersUnlock)
	// 	r.POST("/forgot-password", p.postUsersForgotPassword)
	// 	r.POST("/reset-password", p.postUsersResetPassword)
	// }, "/users")
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.GET("/info", p.getUsersInfo)
	// 	r.POST("/info", p.postUsersInfo)
	// 	r.GET("/logs", p.getUsersLogs)
	// 	r.POST("/change-password", p.postUsersChangePassword)
	// 	r.DELETE("/sign-out", p.deleteUsersSignOut)
	// }, "/users", p.Jwt.MustSignInMiddleware)
	//
	// rt.Group(func(r *h2o.Router) {
	// 	r.Crud(
	// 		"",
	// 		[]h2o.HandlerFunc{p.indexAttachments},
	// 		[]h2o.HandlerFunc{p.createAttachment},
	// 		[]h2o.HandlerFunc{p.canEditAttachment, p.showAttachment},
	// 		[]h2o.HandlerFunc{p.canEditAttachment, p.updateAttachment},
	// 		[]h2o.HandlerFunc{p.canEditAttachment, p.destroyAttachment},
	// 	)
	// }, "/attachments", p.Jwt.MustSignInMiddleware)
}
