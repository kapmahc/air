package web

import (
	"net/http"

	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
)

// Wrap wrap handler
func Wrap(f func(*gin.Context) error) gin.HandlerFunc {
	return func(c *gin.Context) {
		if e := f(c); e != nil {
			log.Error(e)
			s := http.StatusInternalServerError
			if he, ok := e.(*HTTPError); ok {
				s = he.Status
			}
			c.String(s, e.Error())
			c.Abort()
		}
	}
}
