package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {

	ung := rt.Group("/users")
	ung.GET("/", web.Wrap(p.indexUsers))
	ung.POST("/sign-in", web.Wrap(p.postUsersSignIn))
	ung.POST("/sign-up", web.Wrap(p.postUsersSignUp))
	ung.POST("/confirm", web.Wrap(p.postUsersConfirm))
	ung.GET("/confirm/:token", web.Wrap(p.getUsersConfirm))
	ung.POST("/unlock", web.Wrap(p.postUsersUnlock))
	ung.GET("/unlock/:token", web.Wrap(p.getUsersUnlock))
	ung.POST("/forgot-password", web.Wrap(p.postUsersForgotPassword))
	ung.POST("/reset-password", web.Wrap(p.postUsersResetPassword))

	umg := rt.Group("/users", web.Wrap(p.Jwt.MustSignInMiddleware))
	umg.GET("/info", web.Wrap(p.getUsersInfo))
	umg.POST("/info", web.Wrap(p.postUsersInfo))
	umg.GET("/logs", web.Wrap(p.getUsersLogs))
	umg.POST("/change-password", web.Wrap(p.postUsersChangePassword))
	umg.DELETE("/sign-out", web.Wrap(p.deleteUsersSignOut))

	atg := rt.Group("/attachments", web.Wrap(p.Jwt.MustSignInMiddleware))
	atg.GET("/", web.Wrap(p.indexAttachments))
	atg.POST("/", web.Wrap(p.createAttachment))
	atg.GET("/:id", web.Wrap(p.canEditAttachment), web.Wrap(p.showAttachment))
	atg.POST("/:id", web.Wrap(p.canEditAttachment), web.Wrap(p.updateAttachment))
	atg.DELETE("/:id", web.Wrap(p.canEditAttachment), web.Wrap(p.destroyAttachment))

}
