package settings

import (
	"bytes"
	"encoding/gob"

	"github.com/kapmahc/air/web/security"
)

// Settings setting helper
type Settings struct {
	Store  Store            `inject:""`
	Cipher *security.Cipher `inject:""`
}

//Set save setting
func (p *Settings) Set(k string, v interface{}, f bool) error {
	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)
	err := enc.Encode(v)
	if err != nil {
		return err
	}
	var val []byte
	if f {
		if val, err = p.Cipher.Encrypt(buf.Bytes()); err != nil {
			return err
		}
	} else {
		val = buf.Bytes()
	}
	return p.Store.Set(k, val, f)

}

//Get get setting value by key
func (p *Settings) Get(k string, v interface{}) error {
	val, enc, err := p.Store.Get(k)
	if err != nil {
		return err
	}

	var buf bytes.Buffer
	dec := gob.NewDecoder(&buf)

	if enc {
		vl, er := p.Cipher.Decrypt(val)
		if er != nil {
			return er
		}
		buf.Write(vl)
	} else {
		buf.Write(val)
	}

	return dec.Decode(v)
}
