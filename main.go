package main

import (
	"log"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	// _ "github.com/kapmahc/air/plugins/erp"
	// _ "github.com/kapmahc/air/plugins/forms"
	// _ "github.com/kapmahc/air/plugins/forum"
	// _ "github.com/kapmahc/air/plugins/ops/mail"
	// _ "github.com/kapmahc/air/plugins/ops/vpn"
	// _ "github.com/kapmahc/air/plugins/pos"
	// _ "github.com/kapmahc/air/plugins/reading"
	// _ "github.com/kapmahc/air/plugins/shop"
	// _ "github.com/kapmahc/air/plugins/site"
	"github.com/kapmahc/air/web"
)

func main() {
	if err := web.Main(); err != nil {
		log.Fatal(err)
	}
}
