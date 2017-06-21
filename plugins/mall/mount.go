package mall

import (
	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
)

// Mount mount web points
func (p *Plugin) Mount(rt *gin.Engine) {
	const root = "/mall"
	rng := rt.Group(root)
	rmg := rt.Group(root, web.Wrap(p.Jwt.MustSignInMiddleware))
	rag := rt.Group(root, web.Wrap(p.Jwt.MustAdminMiddleware))

	rmg.GET("/addresses", web.Wrap(p.indexAddresses))
	rmg.POST("/addresses", web.Wrap(p.createAddress))
	rmg.GET("/addresses/:id", web.Wrap(p.showAddress))
	rmg.POST("/addresses/:id", web.Wrap(p.updateAddress))
	rmg.DELETE("/addresses/:id", web.Wrap(p.destroyAddress))

	rng.GET("/stores", web.Wrap(p.indexStores))
	rmg.POST("/stores", web.Wrap(p.createStore))
	rmg.GET("/stores/my", web.Wrap(p.myStores))
	rng.GET("/stores/info/:id", web.Wrap(p.showStore))
	rmg.POST("/stores/info/:id", web.Wrap(p.updateStore))
	rmg.GET("/stores/managers/:id", web.Wrap(p.getStoreManagers))
	rmg.POST("/stores/managers/:id", web.Wrap(p.postStoreManagers))
	rmg.DELETE("/stores/:id", web.Wrap(p.destroyStore))

	rng.GET("/tags", web.Wrap(p.indexTags))
	rag.POST("/tags", web.Wrap(p.createTag))
	rng.GET("/tags/:id", web.Wrap(p.showTag))
	rag.POST("/tags/:id", web.Wrap(p.updateTag))
	rag.DELETE("/tags/:id", web.Wrap(p.destroyTag))

}
