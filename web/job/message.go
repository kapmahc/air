package job

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

const (
	// PriorityHigh high
	PriorityHigh = uint8(8)
	// PriorityNormal normal
	PriorityNormal = uint8(4)
	// PriorityLow low
	PriorityLow = uint8(1)
)

// Message message
type Message struct {
	Type     string
	ID       string
	Body     []byte
	Priority uint8
	Created  time.Time
}

// Parse parse
func (p *Message) Parse(v interface{}) error {
	return json.Unmarshal(p.Body, v)
}

// NewMessage new message
func NewMessage(p uint8, t string, v interface{}) (*Message, error) {
	buf, err := json.Marshal(v)
	if err != nil {
		return nil, err
	}
	return &Message{
		ID:       uuid.New().String(),
		Type:     t,
		Priority: p,
		Body:     buf,
		Created:  time.Now(),
	}, nil
}
