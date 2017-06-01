package site

import (
	"database/sql"
	"fmt"
	"path"
	"time"

	"github.com/kapmahc/air/web"
	"github.com/spf13/viper"
	"github.com/steinbacher/goose"
)

func printMigrationStatus(db *sql.DB, version int64, script string) error {
	var row goose.Migration
	q := fmt.Sprintf("SELECT tstamp, is_applied FROM goose_db_version WHERE version_id=%d ORDER BY tstamp DESC LIMIT 1", version)
	e := db.QueryRow(q).Scan(&row.TStamp, &row.IsApplied)

	if e != nil && e != sql.ErrNoRows {
		return e
	}

	var appliedAt string

	if row.IsApplied {
		appliedAt = row.TStamp.Format(time.ANSIC)
	} else {
		appliedAt = "Pending"
	}

	fmt.Printf("    %-24s -- %v\n", appliedAt, script)
	return nil
}

func dbConf() (*goose.DBConf, error) {
	drv := goose.DBDriver{
		Name: viper.GetString("database.driver"),
		DSN:  web.DataSource(),
	}
	switch drv.Name {
	case "postgres":
		drv.Import = "github.com/lib/pq"
		drv.Dialect = &goose.PostgresDialect{}
	case "mysql":
		drv.Import = "github.com/go-sql-driver/mysql"
		drv.Dialect = &goose.MySqlDialect{}
	default:
		return nil, fmt.Errorf("unsupported driver %s", drv.Name)
	}
	return &goose.DBConf{
		Driver:        drv,
		MigrationsDir: path.Join("db", drv.Name, "migrations"),
	}, nil
}
