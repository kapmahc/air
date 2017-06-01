package security

import (
	"crypto/hmac"
	"crypto/sha512"
)

// Hmac hmac
type Hmac struct {
	Key []byte `inject:"hmac.key"`
}

// Sum sum hmac
func (p *Hmac) Sum(plain []byte) []byte {
	mac := hmac.New(sha512.New, p.Key)
	return mac.Sum(plain)
}

// Chk chk hmac
func (p *Hmac) Chk(plain, code []byte) bool {
	return hmac.Equal(p.Sum(plain), code)
}
