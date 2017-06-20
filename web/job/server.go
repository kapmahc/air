package job

import (
	"fmt"
	"reflect"
	"runtime"
	"time"

	log "github.com/sirupsen/logrus"
)

// New new server
func New() *Server {
	return &Server{tasks: make(map[string]Handler)}
}

// Server server
type Server struct {
	tasks map[string]Handler
	Queue Queue `inject:""`
}

// Do do
func (p *Server) Do(name string) error {
	log.Infof("waiting for messages, to exit press CTRL+C")
	return p.Queue.Receive(name, func(msg *Message) error {
		now := time.Now()
		log.Infof("receive message %s@%s", msg.ID, msg.Type)
		hnd, ok := p.tasks[msg.Type]
		if !ok {
			return fmt.Errorf("unknown message type %s", msg.Type)
		}
		err := hnd(msg.Body)
		if err == nil {
			log.Infof("done %s %s", msg.ID, time.Now().Sub(now))
		}
		return err
	})
}

// Send send message
func (p *Server) Send(prv uint8, typ string, val interface{}) error {
	msg, err := NewMessage(prv, typ, val)
	if err != nil {
		return err
	}
	return p.Queue.Send(msg)
}

// Status status
func (p *Server) Status() map[string]string {
	val := make(map[string]string)
	for k, v := range p.tasks {
		val[k] = runtime.FuncForPC(reflect.ValueOf(v).Pointer()).Name()
	}
	return val
}

// Register register job
func (p *Server) Register(t string, f Handler) {
	if _, ok := p.tasks[t]; ok {
		log.Warningf("task %s already exists!", t)
	}
	p.tasks[t] = f
}
