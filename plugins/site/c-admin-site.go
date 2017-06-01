package site

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web/i18n"
)

type fmSiteInfo struct {
	Title       string `form:"title"`
	SubTitle    string `form:"subTitle"`
	Keywords    string `form:"keywords"`
	Description string `form:"description"`
	Copyright   string `form:"copyright"`
}

func (p *Plugin) postAdminSiteInfo(c *gin.Context) error {
	var fm fmSiteInfo
	if err := c.Bind(&fm); err != nil {
		return err
	}

	lng := c.MustGet(i18n.LOCALE).(string)

	for k, v := range map[string]string{
		"title":       fm.Title,
		"subTitle":    fm.SubTitle,
		"keywords":    fm.Keywords,
		"description": fm.Description,
		"copyright":   fm.Copyright,
	} {
		if err := p.I18n.Set(lng, "site."+k, v); err != nil {
			return err
		}
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

type fmSiteAuthor struct {
	Name  string `form:"name"`
	Email string `form:"email"`
}

func (p *Plugin) postAdminSiteAuthor(c *gin.Context) error {
	var fm fmSiteAuthor
	if err := c.Bind(&fm); err != nil {
		return err
	}

	lng := c.MustGet(i18n.LOCALE).(string)
	for k, v := range map[string]string{
		"name":  fm.Name,
		"email": fm.Email,
	} {
		if err := p.I18n.Set(lng, "site.author."+k, v); err != nil {
			return err
		}
	}

	c.JSON(http.StatusOK, gin.H{})
	return nil
}

func (p *Plugin) getAdminSiteSeo(c *gin.Context) error {
	var gc string
	var bc string
	p.Settings.Get("site.google.verify.code", &gc)
	p.Settings.Get("site.baidu.verify.code", &bc)

	links := []string{"robots.txt", "sitemap.xml.gz", "google" + gc + ".html", "baidu_verify_" + bc + ".html"}
	langs, err := p.I18n.Store.Languages()
	if err != nil {
		return err
	}
	for _, l := range langs {
		links = append(links, "rss-"+l+".atom")
	}

	c.JSON(
		http.StatusOK,
		gin.H{
			"googleVerifyCode": gc,
			"baiduVerifyCode":  bc,
			"links":            links,
		})
	return nil
}

type fmSiteSeo struct {
	GoogleVerifyCode string `form:"googleVerifyCode"`
	BaiduVerifyCode  string `form:"baiduVerifyCode"`
}

func (p *Plugin) postAdminSiteSeo(c *gin.Context) error {
	var fm fmSiteSeo
	if err := c.Bind(&fm); err != nil {
		return err
	}

	for k, v := range map[string]string{
		"google.verify.code": fm.GoogleVerifyCode,
		"baidu.verify.code":  fm.BaiduVerifyCode,
	} {
		if err := p.Settings.Set("site."+k, v, true); err != nil {
			return err
		}
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}

type fmSiteSMTP struct {
	Host                 string `form:"host"`
	Port                 int    `form:"port"`
	Ssl                  string `form:"ssl"`
	Username             string `form:"username"`
	Password             string `form:"password" validate:"min=6,max=32"`
	PasswordConfirmation string `form:"passwordConfirmation" validate:"eqfield=Password"`
}

func (p *Plugin) getAdminSiteSMTP(c *gin.Context) error {
	smtp := make(map[string]interface{})
	if err := p.Settings.Get("site.smtp", &smtp); err == nil {
		smtp["password"] = ""
	} else {
		smtp["host"] = "localhost"
		smtp["port"] = 25
		smtp["ssl"] = false
		smtp["username"] = "no-reply@change-me.com"
		smtp["password"] = ""
	}
	c.JSON(http.StatusOK, gin.H{
		"smtp":  smtp,
		"ports": []int{25, 465, 587},
	})
	return nil
}

func (p *Plugin) postAdminSiteSMTP(c *gin.Context) error {
	var fm fmSiteSMTP
	if err := c.Bind(&fm); err != nil {
		return err
	}
	val := map[string]interface{}{
		"host":     fm.Host,
		"port":     fm.Port,
		"username": fm.Username,
		"password": fm.Password,
		"ssl":      fm.Ssl == "on",
	}
	if err := p.Settings.Set("site.smtp", val, true); err != nil {
		return err
	}
	c.JSON(http.StatusOK, gin.H{})
	return nil
}
