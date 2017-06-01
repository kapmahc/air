package web

import (
	"github.com/facebookgo/inject"
	"github.com/gin-gonic/gin"
	"github.com/ikeikeikeike/go-sitemap-generator/stm"
	"github.com/kapmahc/air/web/job"
	"github.com/urfave/cli"
	"golang.org/x/tools/blog/atom"
)

// Plugin plugin
type Plugin interface {
	Init()
	Mount(rt *gin.Engine)
	Open(*inject.Graph) error
	Console() []cli.Command
	Atom(lang string) ([]*atom.Entry, error)
	Sitemap() ([]stm.URL, error)
	Workers() map[string]job.Handler
}

var plugins []Plugin

// Register register plugins
func Register(args ...Plugin) {
	plugins = append(plugins, args...)
}

// Walk walk plugins
func Walk(f func(Plugin) error) error {
	for _, p := range plugins {
		if err := f(p); err != nil {
			return err
		}
	}
	return nil
}
