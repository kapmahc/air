package mail_test

import (
	"testing"

	"github.com/kapmahc/air/plugins/ops/mail"
)

func TestPassword(t *testing.T) {
	hello := "hello"
	var user mail.User
	if err := user.SetPassword(hello); err != nil {
		t.Fatal(err)
	}
	if !user.ChkPassword(hello) {
		t.Fatal("error on check password")
	}
	t.Logf("doveadm pw -t {SSHA512}%s -p %s", user.Password, hello)
}
