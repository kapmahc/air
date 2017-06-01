package reading

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/facebookgo/inject"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/epub"
	"github.com/urfave/cli"
)

const (
	// EPUB epub book ext
	EPUB = ".epub"
	// SEP sep
	SEP = ";"
)

func (p *Plugin) root() string {
	return filepath.Join("tmp", "books")
}

// Console console commands
func (p *Plugin) Console() []cli.Command {
	return []cli.Command{
		{
			Name:  "books",
			Usage: "books operations",
			Subcommands: []cli.Command{
				{
					Name:    "scan",
					Usage:   fmt.Sprintf("scan books in %s", p.root()),
					Aliases: []string{"s"},
					Action:  web.Inject(p.scanBook),
				},
			},
		},
	}
}

func (p *Plugin) scanBook(*cli.Context, *inject.Graph) error {
	root := p.root()
	var count int64
	var total int64
	if err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() || filepath.Ext(info.Name()) != EPUB {
			return nil
		}
		log.Infof("find book %s", path)
		total++

		bk, err := epub.Open(path)
		if err != nil {
			return err
		}
		mt := bk.Opf.Metadata
		var authors []string
		for _, a := range mt.Creator {
			authors = append(authors, a.Data)
		}

		book := Book{
			Title:       strings.Join(mt.Title, SEP),
			Lang:        strings.Join(mt.Language, SEP),
			Author:      strings.Join(authors, SEP),
			Publisher:   strings.Join(mt.Publisher, SEP),
			Subject:     strings.Join(mt.Subject, SEP),
			Description: strings.Join(mt.Description, SEP),
			Type:        bk.Mimetype,
			File:        path[len(root)+1:],
		}
		var ct int
		if err = p.Db.Model(&Book{}).Where("file = ?", book.File).Count(&ct).Error; err != nil {
			return err
		}
		if ct > 0 {
			return nil
		}
		if len(mt.Date) > 0 {
			date := mt.Date[0].Data
			layout := "2006-01-02"
			if len(date) > len(layout) {
				date = date[:len(layout)]
			}
			book.PublishedAt, err = time.Parse(layout, date)
			if err != nil {
				return err
			}
		}
		if len(mt.Coverage) > 0 {
			book.Cover = mt.Coverage[0]
		}
		if err = p.Db.Create(&book).Error; err != nil {
			return err
		}
		count++
		return nil
	}); err != nil {
		return err
	}
	log.Infof("sync %d/%d books", count, total)
	return nil
}
