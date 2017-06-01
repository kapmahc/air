package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

type fmAttachmentNew struct {
	Type string `json:"type" binding:"required,max=255"`
	ID   uint   `json:"id"`
}

func (p *Plugin) createAttachment(c *gin.Context) error {
	user := c.MustGet(CurrentUser).(*User)

	file, header, err := c.Request.FormFile("file")
	if err != nil {
		return err
	}

	url, size, err := p.Uploader.Save(header)
	if err != nil {
		return err
	}

	// http://golang.org/pkg/net/http/#DetectContentType
	buf := make([]byte, 512)
	file.Seek(0, 0)
	if _, err = file.Read(buf); err != nil {
		return err
	}

	a := Attachment{
		Title:        header.Filename,
		URL:          url,
		UserID:       user.ID,
		MediaType:    http.DetectContentType(buf),
		Length:       size / 1024,
		ResourceType: DefaultResourceType, //fm.Type,
		ResourceID:   DefaultResourceID,   //fm.ID,
	}
	if err := p.Db.Create(&a).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, a)
	return nil
}

type fmAttachmentEdit struct {
	Title string `json:"title" binding:"required,max=255"`
}

func (p *Plugin) updateAttachment(c *gin.Context) error {
	a := c.MustGet("item").(*Attachment)
	var fm fmAttachmentEdit
	if err := c.BindJSON(&fm); err != nil {
		return err
	}
	if err := p.Db.Model(a).Update("title", fm.Title).Error; err != nil {
		return err
	}

	c.JSON(http.StatusOK, a)
	return nil
}

func (p *Plugin) destroyAttachment(c *gin.Context) error {
	a := c.MustGet("item").(*Attachment)
	if err := p.Db.Delete(a).Error; err != nil {
		return err
	}
	if err := p.Uploader.Remove(a.URL); err != nil {
		return err
	}
	c.JSON(http.StatusOK, a)
	return nil
}

func (p *Plugin) showAttachment(c *gin.Context) error {
	a := c.MustGet("item").(*Attachment)
	c.JSON(http.StatusOK, a)
	return nil
}

func (p *Plugin) indexAttachments(c *gin.Context) error {
	user := c.MustGet(CurrentUser).(*User)
	isa := c.MustGet(IsAdmin).(bool)
	var items []Attachment
	qry := p.Db
	if !isa {
		qry = qry.Where("user_id = ?", user.ID)
	}
	if err := qry.Order("updated_at DESC").Find(&items).Error; err != nil {
		return err
	}
	c.JSON(http.StatusOK, items)
	return nil
}

func (p *Plugin) canEditAttachment(c *gin.Context) error {
	user := c.MustGet(CurrentUser).(*User)
	lng := c.MustGet(i18n.LOCALE).(string)

	var a Attachment
	if err := p.Db.Where("id = ?", c.Param("id")).First(&a).Error; err != nil {
		return err
	}

	if user.ID == a.UserID || c.MustGet(IsAdmin).(bool) {
		c.Set("item", &a)
		return nil
	}

	return p.I18n.E(http.StatusForbidden, lng, "auth.errors.not-allow")
}
