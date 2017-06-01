package rabbitmq

import (
	"fmt"

	"github.com/kapmahc/air/web/job"
	"github.com/streadway/amqp"
)

// New new queue
func New(name, host string, port int, user, password, virtual string) job.Queue {
	return &Queue{
		name: name,
		url: fmt.Sprintf(
			"amqp://%s:%s@%s:%d/%s",
			user,
			password,
			host,
			port,
			virtual,
		),
	}
}

// Queue queue
type Queue struct {
	url  string
	name string
}

// Receive receive
func (p *Queue) Receive(name string, hnd func(*job.Message) error) error {
	return p.open(func(ch *amqp.Channel) error {
		if err := ch.Qos(1, 0, false); err != nil {
			return err
		}
		qu, err := ch.QueueDeclare(p.name, true, false, false, false, nil)
		if err != nil {
			return err
		}
		msgs, err := ch.Consume(qu.Name, name, false, false, false, false, nil)
		if err != nil {
			return err
		}
		for d := range msgs {
			d.Ack(false)
			if err := hnd(&job.Message{
				ID:       d.MessageId,
				Type:     d.Type,
				Created:  d.Timestamp,
				Priority: d.Priority,
				Body:     d.Body,
			}); err != nil {
				return err
			}
		}
		return nil
	})
}

// Send send job
func (p *Queue) Send(msg *job.Message) error {
	return p.open(func(ch *amqp.Channel) error {
		qu, err := ch.QueueDeclare(p.name, true, false, false, false, nil)
		if err != nil {
			return err
		}

		return ch.Publish("", qu.Name, false, false, amqp.Publishing{
			DeliveryMode: amqp.Persistent,
			ContentType:  "text/plain",
			MessageId:    msg.ID,
			Priority:     msg.Priority,
			Body:         msg.Body,
			Timestamp:    msg.Created,
			Type:         msg.Type,
		})
	})
}

func (p *Queue) open(f func(*amqp.Channel) error) error {
	conn, err := amqp.Dial(p.url)
	if err != nil {
		return err
	}
	defer conn.Close()
	ch, err := conn.Channel()
	if err != nil {
		return err
	}
	defer ch.Close()

	return f(ch)
}
