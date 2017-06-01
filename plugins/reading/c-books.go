package reading

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"path"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/epub"
)

func (p *Plugin) indexBooks(c *gin.Context) error {

	var total int64
	if err := p.Db.Model(&Book{}).Count(&total).Error; err != nil {
		return err
	}
	pag := web.NewPagination(c.Request, total)

	var books []Book
	if err := p.Db.
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&books).Error; err != nil {
		return err
	}
	for _, b := range books {
		pag.Items = append(pag.Items, b)
	}
	c.JSON(http.StatusOK, pag)
	return nil
}

func (p *Plugin) showBook(c *gin.Context) error {
	data := gin.H{}

	var buf bytes.Buffer
	it, bk, err := p.readBook(c.Param("id"))
	if err != nil {
		return err
	}
	var notes []Note
	if err := p.Db.Order("updated_at DESC").Find(&notes).Error; err != nil {
		return err
	}
	data["notes"] = notes
	// c.Writer.Header().Set("Content-Type", "text/html; charset=utf-8")
	p.writePoints(
		&buf,
		fmt.Sprintf("%s/reading/pages/%d", web.Backend(), it.ID),
		bk.Ncx.Points,
	)
	data["homeage"] = buf.String()
	data["book"] = it

	c.JSON(http.StatusOK, data)
	return nil
}

func (p *Plugin) showPage(c *gin.Context) error {
	return p.readBookPage(c.Writer, c.Param("id"), c.Param("href")[1:])
}

// -----------------------

func (p *Plugin) readBookPage(w http.ResponseWriter, id string, name string) error {
	_, bk, err := p.readBook(id)
	if err != nil {
		return err
	}
	for _, fn := range bk.Files() {
		if strings.HasSuffix(fn, name) {
			for _, mf := range bk.Opf.Manifest {
				if mf.Href == name {
					rdr, err := bk.Open(name)
					if err != nil {
						return err
					}
					defer rdr.Close()
					body, err := ioutil.ReadAll(rdr)
					if err != nil {
						return err
					}
					w.Header().Set("Content-Type", mf.MediaType)
					w.Write(body)
					return nil
				}
			}
		}
	}
	return errors.New("not found")
}

func (p *Plugin) writePoints(wrt io.Writer, href string, points []epub.NavPoint) {
	wrt.Write([]byte("<ol>"))
	for _, it := range points {
		wrt.Write([]byte("<li>"))
		fmt.Fprintf(
			wrt,
			`<a href="%s/%s" target="_blank">%s</a>`,
			href,
			it.Content.Src,
			it.Text,
		)
		p.writePoints(wrt, href, it.Points)
		wrt.Write([]byte("</li>"))
	}
	wrt.Write([]byte("</ol>"))
}

func (p *Plugin) readBook(id string) (*Book, *epub.Book, error) {
	var book Book
	if err := p.Db.
		Where("id = ?", id).First(&book).Error; err != nil {
		return nil, nil, err
	}
	bk, err := epub.Open(path.Join(p.root(), book.File))
	return &book, bk, err
}

func (p *Plugin) destroyBook(c *gin.Context) error {
	if err := p.Db.
		Where("id = ?", c.Param("id")).
		Delete(Book{}).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil

}
