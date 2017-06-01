package reading

import (
	"path"

	log "github.com/Sirupsen/logrus"
	"github.com/kapmahc/stardict"
)

var dictionaries []*stardict.Dictionary

func init() {
	var err error
	dictionaries, err = stardict.Open(path.Join("tmp", "dic"))
	if err != nil {
		log.Error("bad in open stardict")
	}
}
