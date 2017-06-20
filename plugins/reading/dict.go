package reading

import (
	"path"

	"github.com/kapmahc/stardict"
	log "github.com/sirupsen/logrus"
)

var dictionaries []*stardict.Dictionary

func init() {
	var err error
	dictionaries, err = stardict.Open(path.Join("tmp", "dic"))
	if err != nil {
		log.Error("bad in open stardict")
	}
}
