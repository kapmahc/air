package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/SermoDigital/jose/jws"
	"github.com/kapmahc/air/web"
	"github.com/kapmahc/air/web/job"
	log "github.com/sirupsen/logrus"
	gomail "gopkg.in/gomail.v2"
)

const (
	actConfirm       = "confirm"
	actUnlock        = "unlock"
	actResetPassword = "reset-password"

	// SendEmailJob send email
	SendEmailJob = "send-email"
)

// Workers job handler
func (p *Plugin) Workers() map[string]job.Handler {
	return map[string]job.Handler{
		SendEmailJob: func(buf []byte) error {
			var msg map[string]string
			if err := json.Unmarshal(buf, &msg); err != nil {
				return err
			}
			return p.doSendEmail(msg["to"], msg["subject"], msg["body"])
		},
	}
}

func (p *Plugin) sendEmail(lng string, user *User, act string) {
	cm := jws.Claims{}
	cm.Set("act", act)
	cm.Set("uid", user.UID)
	tkn, err := p.Jwt.Sum(cm, time.Hour*6)
	if err != nil {
		log.Error(err)
		return
	}

	obj := struct {
		Backend  string
		Frontend string
		Token    string
	}{
		Backend:  web.Backend(),
		Frontend: web.Frontend(),
		Token:    string(tkn),
	}
	subject, err := p.I18n.F(lng, fmt.Sprintf("auth.emails.%s.subject", act), obj)
	if err != nil {
		log.Error(err)
		return
	}
	body, err := p.I18n.F(lng, fmt.Sprintf("auth.emails.%s.body", act), obj)
	if err != nil {
		log.Error(err)
		return
	}

	// -----------------------
	if err := p.Server.Send(job.PriorityLow, SendEmailJob, map[string]string{
		"to":      user.Email,
		"subject": subject,
		"body":    body,
	}); err != nil {
		log.Error(err)
	}
}

func (p *Plugin) parseToken(lng, tkn, act string) (*User, error) {
	cm, err := p.Jwt.Validate([]byte(tkn))
	if err != nil {
		return nil, err
	}
	if act != cm.Get("act").(string) {
		return nil, p.I18n.E(http.StatusBadRequest, lng, "errors.bad-action")
	}
	return p.Dao.GetUserByUID(cm.Get("uid").(string))
}

func (p *Plugin) doSendEmail(to, subject, body string) error {
	if !(web.IsProduction()) {
		log.Debugf("send to %s: %s\n%s", to, subject, body)
		return nil
	}
	smtp := make(map[string]interface{})
	if err := p.Settings.Get("site.smtp", &smtp); err != nil {
		return err
	}

	sender := smtp["username"].(string)
	msg := gomail.NewMessage()
	msg.SetHeader("From", sender)
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", subject)
	msg.SetBody("text/html", body)

	dia := gomail.NewDialer(
		smtp["host"].(string),
		smtp["port"].(int),
		sender,
		smtp["password"].(string),
	)

	return dia.DialAndSend(msg)
}
