package web

import (
	"fmt"
	"os"
	"time"

	"github.com/urfave/cli"
)

var (
	// Version version
	Version string
	// BuildTime build time
	BuildTime string
	// Usage usage
	Usage string
	// Copyright copyright
	Copyright string
	// AuthorName author's name
	AuthorName string
	// AuthorEmail author's email
	AuthorEmail string
)

// Main The entry
func Main() error {
	app := cli.NewApp()
	app.Name = os.Args[0]
	app.Version = fmt.Sprintf("%s (%s)", Version, BuildTime)
	app.Authors = []cli.Author{
		cli.Author{
			Name:  AuthorName,
			Email: AuthorEmail,
		},
	}
	if ts, err := time.Parse(time.RFC1123Z, BuildTime); err == nil {
		app.Compiled = ts
	}

	app.Copyright = Copyright
	app.Usage = Usage
	app.EnableBashCompletion = true
	app.Commands = []cli.Command{}

	Walk(func(p Plugin) error {
		items := p.Console()
		app.Commands = append(app.Commands, items...)
		return nil
	})

	return app.Run(os.Args)
}
