package mall

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	rng := rt.Group("/mall")
	rmg := rt.Group("/mall", web.Wrap(p.Jwt.MustSignInMiddleware))

	rmg.GET("/addresses", web.Wrap(p.indexAddresses))
	rmg.POST("/addresses", web.Wrap(p.createAddress))
	rmg.GET("/addresses/:id", web.Wrap(p.showAddress))
	rmg.POST("/addresses/:id", web.Wrap(p.updateAddress))
	rmg.DELETE("/addresses/:id", web.Wrap(p.destroyAddress))

	rng.GET("/stores", web.Wrap(p.indexStores))
}
