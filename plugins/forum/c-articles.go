package forum

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/air/web/i18n"
)

func (p *Plugin) myArticles(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	isa := c.MustGet(auth.IsAdmin).(bool)
	var articles []Article
	qry := p.Db.Select([]string{"title", "updated_at", "id"})
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&articles).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, articles)
	return nil
}

func (p *Plugin) indexArticles(c *gin.Context) error {
	var total int64
	var pag *web.Pagination
	if err := p.Db.Model(&Article{}).Count(&total).Error; err != nil {
		return err
	}

	pag = web.NewPagination(c.Request, total)
	var articles []Article
	if err := p.Db.Select([]string{"id", "title", "summary", "user_id", "updated_at"}).
		Limit(pag.Limit()).Offset(pag.Offset()).
		Find(&articles).Error; err != nil {
		return err
	}

	for _, it := range articles {
		pag.Items = append(pag.Items, it)
	}

	c.JSON(http.StatusOK, pag)
	return nil
}

type fmArticle struct {
	Title   string   `form:"title" validate:"required,max=255"`
	Summary string   `form:"summary" validate:"required,max=500"`
	Type    string   `form:"type" validate:"required,max=8"`
	Body    string   `form:"body" validate:"required,max=2000"`
	Tags    []string `form:"tags"`
}

func (p *Plugin) createArticle(c *gin.Context) error {
	user := c.MustGet(auth.CurrentUser).(*auth.User)
	var fm fmArticle
	if err := c.Bind(&fm); err != nil {
		return err
	}

	var tags []Tag
	for _, it := range fm.Tags {
		var t Tag
		if err := p.Db.Select([]string{"id"}).Where("id = ?", it).First(&t).Error; err == nil {
			tags = append(tags, t)
		} else {
			return err
		}
	}
	a := Article{
		Title:   fm.Title,
		Summary: fm.Summary,
		Body:    fm.Body,
		Type:    fm.Type,
		UserID:  user.ID,
	}

	if err := p.Db.Create(&a).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&a).Association("Tags").Append(tags).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, a)
	return nil
}

func (p *Plugin) showArticle(c *gin.Context) error {

	var a Article
	if err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&a).Related(&a.Comments).Error; err != nil {
		return err
	}
	if err := p.Db.Model(&a).Association("Tags").Find(&a.Tags).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, a)
	return nil
}

func (p *Plugin) updateArticle(c *gin.Context) error {
	a := c.MustGet("item").(*Article)
	var fm fmArticle
	if err := c.Bind(&fm); err != nil {
		return err
	}

	var tags []Tag
	for _, it := range fm.Tags {
		var t Tag
		if err := p.Db.Select([]string{"id"}).Where("id = ?", it).First(&t).Error; err == nil {
			tags = append(tags, t)
		} else {
			return err
		}
	}

	if err := p.Db.Model(a).Updates(map[string]interface{}{
		"title":   fm.Title,
		"summary": fm.Summary,
		"body":    fm.Body,
		"type":    fm.Type,
	}).Error; err != nil {
		return err
	}

	if err := p.Db.Model(a).Association("Tags").Replace(tags).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) destroyArticle(c *gin.Context) error {
	a := c.MustGet("item").(*Article)
	if err := p.Db.Model(a).Association("Tags").Clear().Error; err != nil {
		return err
	}
	if err := p.Db.Delete(a).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) canEditArticle(c *gin.Context) error {
	lng := c.MustGet(i18n.LOCALE).(string)
	user := c.MustGet(auth.CurrentUser).(*auth.User)

	var a Article
	if err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error; err != nil {
		return err
	}

	if user.ID == a.UserID || c.MustGet(auth.IsAdmin).(bool) {
		c.Set("item", &a)
		return nil
	}
	return p.I18n.E(http.StatusForbidden, lng, "errors.forbidden")
}
