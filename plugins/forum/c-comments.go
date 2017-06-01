package forum

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) getMyComments(c *gin.Context) error {

	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var comments []Comment
	qry := p.Db.Select([]string{"body", "article_id", "updated_at", "id"})
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&comments).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, comments)
	return nil
}

func (p *Plugin) indexComments(c *gin.Context) error {

	var total int64
	if err := p.Db.Model(&Comment{}).Count(&total).Error; err != nil {
		return err
	}
	var pag *web.Pagination

	pag = web.NewPagination(c.Request, total)

	var comments []Comment
	if err := p.Db.Select([]string{"id", "type", "body", "article_id", "updated_at"}).
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&comments).Error; err != nil {
		return err
	}
	for _, it := range comments {
		pag.Items = append(pag.Items, it)
	}
	c.JSON(http.StatusOK, pag)
	return nil
}

type fmCommentAdd struct {
	Body      string `form:"body" validate:"required,max=800"`
	Type      string `form:"type" validate:"required,max=8"`
	ArticleID uint   `form:"articleId" validate:"required"`
}

func (p *Plugin) createComment(c *gin.Context) error {

	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var fm fmCommentAdd
	if err := c.Bind(&fm); err != nil {
		return err
	}
	cm := Comment{
		Body:      fm.Body,
		Type:      fm.Type,
		ArticleID: fm.ArticleID,
		UserID:    user.ID,
	}

	if err := p.Db.Create(&cm).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, cm)
	return nil
}

func (p *Plugin) showComment(c *gin.Context) error {
	var item Comment
	if err := p.Db.Where("id = ?", c.Param("id")).First(&item).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, item)
	return nil
}

type fmCommentEdit struct {
	Body string `form:"body" validate:"required,max=800"`
	Type string `form:"type" validate:"required,max=8"`
}

func (p *Plugin) updateComment(c *gin.Context) error {
	cm := c.MustGet("item").(*Comment)

	var fm fmCommentEdit
	if err := c.Bind(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(cm).Updates(map[string]interface{}{
		"body": fm.Body,
		"type": fm.Type,
	}).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyComment(c *gin.Context) error {
	comment := c.MustGet("comment").(*Comment)
	if err := p.Db.Delete(comment).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) canEditComment(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var o Comment
	if err := p.Db.Where("id = ?", c.Param("id")).First(&o).Error; err != nil {
		return nil
	}

	if user.ID == o.UserID || c.MustGet(auth.IsAdmin).(bool) {
		c.Set("item", &o)
		return nil
	}
	return p.I18n.E(http.StatusForbidden, lng, "errors.forbidden")
}
