package web

import "time"

const (
	// TypeMARKDOWN markdown format
	TypeMARKDOWN = "markdown"
	// TypeHTML html format
	TypeHTML = "html"
	// TypeTEXT text format
	TypeTEXT = "text"
)

// Timestamp timestamp
type Timestamp struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
}

//Model base model
type Model struct {
	Timestamp
	UpdatedAt time.Time `json:"updatedAt"`
}

// Media media
type Media struct {
	Model
	Body string `json:"body"`
	Type string `json:"type"`
}
