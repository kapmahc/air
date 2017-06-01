package mail

import (
	"crypto/rand"
	"crypto/sha512"
	"encoding/base64"

	"github.com/kapmahc/air/web"
)

// https://www.linode.com/docs/email/postfix/email-with-postfix-dovecot-and-mysql
// http://wiki.dovecot.org/Authentication/PasswordSchemes
// https://mad9scientist.com/dovecot-password-creation-php/

// Domain domain
type Domain struct {
	web.Model
	Name string
}

// TableName table name
func (Domain) TableName() string {
	return "mail_domains"
}

// User user
type User struct {
	web.Model
	FullName string
	Email    string
	Password string
	DomainID uint
	Enable   bool
	Domain   Domain
}

// TableName table name
func (User) TableName() string {
	return "mail_users"
}

func (p *User) sum(password string, salt []byte) string {
	buf := sha512.Sum512(append([]byte(password), salt...))
	return base64.StdEncoding.EncodeToString(append(buf[:], salt...))
}

// SetPassword set  password (SSHA512-CRYPT)
func (p *User) SetPassword(password string) error {
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return err
	}
	p.Password = p.sum(password, salt)
	return nil
}

// ChkPassword check password
func (p *User) ChkPassword(password string) bool {
	buf, err := base64.StdEncoding.DecodeString(p.Password)
	if err != nil {
		return false
	}

	return len(buf) > sha512.Size && p.Password == p.sum(password, buf[sha512.Size:])
}

// Alias alias
type Alias struct {
	web.Model
	Source      string
	Destination string
	DomainID    uint
	Domain      Domain
}

// TableName table name
func (Alias) TableName() string {
	return "mail_aliases"
}
