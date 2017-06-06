package site

import (
	"database/sql"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/user"
	"runtime"
	"strings"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/kapmahc/air/web"
	"github.com/spf13/viper"
)

func (p *Plugin) _osStatus() (gin.H, error) {
	var mem runtime.MemStats
	runtime.ReadMemStats(&mem)
	hn, err := os.Hostname()
	if err != nil {
		return nil, err
	}
	hu, err := user.Current()
	if err != nil {
		return nil, err
	}
	pwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	var ifo syscall.Sysinfo_t
	if err := syscall.Sysinfo(&ifo); err != nil {
		return nil, err
	}
	return gin.H{
		"app author":           fmt.Sprintf("%s <%s>", web.AuthorName, web.AuthorEmail),
		"app licence":          web.Copyright,
		"app version":          fmt.Sprintf("%s(%s) - %s", web.Version, web.BuildTime, viper.GetString("env")),
		"app root":             pwd,
		"who-am-i":             fmt.Sprintf("%s@%s", hu.Username, hn),
		"go version":           runtime.Version(),
		"go root":              runtime.GOROOT(),
		"go runtime":           runtime.NumGoroutine(),
		"go last gc":           time.Unix(0, int64(mem.LastGC)).Format(time.ANSIC),
		"os cpu":               runtime.NumCPU(),
		"os ram(free/total)":   fmt.Sprintf("%dM/%dM", ifo.Freeram/1024/1024, ifo.Totalram/1024/1024),
		"os swap(free/total)":  fmt.Sprintf("%dM/%dM", ifo.Freeswap/1024/1024, ifo.Totalswap/1024/1024),
		"go memory(alloc/sys)": fmt.Sprintf("%dM/%dM", mem.Alloc/1024/1024, mem.Sys/1024/1024),
		"os time":              time.Now().Format(time.ANSIC),
		"os arch":              fmt.Sprintf("%s(%s)", runtime.GOOS, runtime.GOARCH),
		"os uptime":            (time.Duration(ifo.Uptime) * time.Second).String(),
		"os loads":             ifo.Loads,
		"os procs":             ifo.Procs,
	}, nil
}
func (p *Plugin) _networkStatus() (gin.H, error) {
	sts := gin.H{}
	ifs, err := net.Interfaces()
	if err != nil {
		return nil, err
	}
	for _, v := range ifs {
		ips := []string{v.HardwareAddr.String()}
		adrs, err := v.Addrs()
		if err != nil {
			return nil, err
		}
		for _, adr := range adrs {
			ips = append(ips, adr.String())
		}
		sts[v.Name] = ips
	}
	return sts, nil
}

func (p *Plugin) _dbStatus() (gin.H, error) {
	val := gin.H{
		"drivers": strings.Join(sql.Drivers(), ", "),
	}
	switch viper.GetString("database.driver") {
	case postgresqlDriver:
		row := p.Db.Raw("select version()").Row()
		var version string
		row.Scan(&version)
		val["version"] = version
		// http://blog.javachen.com/2014/04/07/some-metrics-in-postgresql.html
		row = p.Db.Raw("select pg_size_pretty(pg_database_size('postgres'))").Row()
		var size string
		row.Scan(&size)
		val["size"] = size
		if rows, err := p.Db.
			Raw("select pid,current_timestamp - least(query_start,xact_start) AS runtime,substr(query,1,25) AS current_query from pg_stat_activity where not pid=pg_backend_pid()").
			Rows(); err == nil {
			defer rows.Close()
			for rows.Next() {
				var pid int
				var ts time.Time
				var qry string
				row.Scan(&pid, &ts, &qry)
				val[fmt.Sprintf("pid-%d", pid)] = fmt.Sprintf("%s (%v)", ts.Format("15:04:05.999999"), qry)
			}
		} else {
			return nil, err
		}
		val["url"] = fmt.Sprintf(
			"%s://%s@%s:%d/%s",
			viper.GetString("database.driver"),
			viper.GetString("database.args.user"),
			viper.GetString("database.args.host"),
			viper.GetInt("database.args.port"),
			viper.GetString("database.args.dbname"),
		)

	}
	return val, nil
}

func (p *Plugin) _routes() []gin.H {
	rt := gin.New()
	web.Walk(func(en web.Plugin) error {
		en.Mount(rt)
		return nil
	})
	var items []gin.H
	for _, r := range rt.Routes() {
		items = append(items, gin.H{"method": r.Method, "path": r.Path})
	}
	return items
}

func (p *Plugin) _cacheStatus() ([]string, error) {
	str, err := p.Cache.Store.Status()
	if err != nil {
		return nil, err
	}
	return strings.Split(str, "\n"), nil
}

func (p *Plugin) getAdminSiteStatus(c *gin.Context) error {
	data := gin.H{}

	var err error
	if data["os"], err = p._osStatus(); err != nil {
		return err
	}
	if data["network"], err = p._networkStatus(); err != nil {
		return err
	}
	data["jobs"] = p.Server.Status()
	data["routes"] = p._routes()

	if data["cache"], err = p._cacheStatus(); err != nil {
		return err
	}
	if data["database"], err = p._dbStatus(); err != nil {
		return err
	}

	c.JSON(http.StatusOK, data)
	return nil
}
