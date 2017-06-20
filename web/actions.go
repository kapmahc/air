package web

import (
	"log/syslog"
	"reflect"

	"github.com/facebookgo/inject"
	"github.com/kapmahc/air/web/job"
	log "github.com/sirupsen/logrus"
	logrus_syslog "github.com/sirupsen/logrus/hooks/syslog"
	"github.com/spf13/viper"
	"github.com/urfave/cli"
)

type injectLogger struct {
}

func (p *injectLogger) Debugf(format string, v ...interface{}) {
	log.Debugf(format, v...)
}

// Config load config first
func Config(f cli.ActionFunc) cli.ActionFunc {

	viper.SetEnvPrefix(reflect.TypeOf(Main).String())
	viper.BindEnv("env")
	viper.SetDefault("env", "development")

	viper.SetConfigName("config")
	viper.SetConfigType("toml")
	viper.AddConfigPath(".")

	return func(c *cli.Context) error {
		if err := viper.ReadInConfig(); err != nil {
			return err
		}

		if IsProduction() {
			// ----------
			log.SetLevel(log.InfoLevel)
			if wrt, err := syslog.New(syslog.LOG_INFO, Name()); err == nil {
				log.AddHook(&logrus_syslog.SyslogHook{Writer: wrt})
			} else {
				log.Error(err)
			}
		} else {
			log.SetLevel(log.DebugLevel)
		}

		log.Infof("read config from %s", viper.ConfigFileUsed())

		Walk(func(p Plugin) error {
			p.Init()
			return nil
		})
		return f(c)
	}
}

// Inject inject objects first
func Inject(f func(*cli.Context, *inject.Graph) error) cli.ActionFunc {
	return Config(func(c *cli.Context) error {
		gh := inject.Graph{Logger: &injectLogger{}}

		srv := job.New()
		if err := gh.Provide(
			&inject.Object{Value: srv},
		); err != nil {
			return err
		}

		if err := Walk(func(p Plugin) error {
			if err := p.Open(&gh); err != nil {
				return err
			}
			return gh.Provide(&inject.Object{Value: p})
		}); err != nil {
			return err
		}

		if err := gh.Populate(); err != nil {
			return err
		}
		// ------------

		Walk(func(p Plugin) error {
			for k, v := range p.Workers() {
				srv.Register(k, v)
			}
			return nil
		})
		// ------------
		return f(c, &gh)
	})
}
