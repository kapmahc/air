package job

// Queue queue
type Queue interface {
	Receive(n string, f func(*Message) error) error
	Send(m *Message) error
}
