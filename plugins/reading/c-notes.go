package reading

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getMyNotes(c *gin.Context) error {

	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var notes []Note
	qry := p.Db
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&notes).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, notes)
	return nil
}

func (p *Plugin) indexNotes(c *gin.Context) error {

	var total int64
	var pag *web.Pagination
	if err := p.Db.Model(&Note{}).Count(&total).Error; err != nil {
		return err
	}

	pag = web.NewPagination(c.Request, total)
	var notes []Note
	if err := p.Db.
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&notes).Error; err != nil {
		return err
	}

	for _, it := range notes {
		pag.Items = append(pag.Items, it)
	}

	c.JSON(http.StatusOK, pag)
	return nil
}

type fmNoteNew struct {
	Type   string `json:"type" binding:"required,max=8"`
	Body   string `json:"body" binding:"required,max=2000"`
	BookID uint   `json:"bookId"`
}

func (p *Plugin) createNote(c *gin.Context) error {

	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var fm fmNoteNew
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	item := Note{
		Type:   fm.Type,
		Body:   fm.Body,
		BookID: fm.BookID,
		UserID: user.ID,
	}
	if err := p.Db.Create(&item).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, item)
	return nil
}

func (p *Plugin) showNote(c *gin.Context) error {
	var item Note
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmNoteEdit struct {
	Type string `json:"type" binding:"required,max=8"`
	Body string `json:"body" binding:"required,max=2000"`
}

func (p *Plugin) updateNote(c *gin.Context) error {
	note := c.MustGet("item").(*Note)

	var fm fmNoteEdit
	if err := c.BindJSON(&fm); err != nil {
		return err
	}

	if err := p.Db.Model(note).
		Updates(map[string]interface{}{
			"body": fm.Body,
			"type": fm.Type,
		}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyNote(c *gin.Context) error {
	n := c.MustGet("item").(*Note)
	if err := p.Db.Delete(n).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) canEditNote(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var n Note
	if err := p.Db.Where("id = ?", c.Param("id")).First(&n).Error; err != nil {
		return err
	}
	if user.ID == n.UserID || c.MustGet(auth.IsAdmin).(bool) {
		c.Set("item", &n)
		return nil
	}
	return p.I18n.E(http.StatusForbidden, lng, "errors.forbidden")
}
