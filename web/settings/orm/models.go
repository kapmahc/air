package orm

import "time"

// Model model
type Model struct {
	ID        uint      `gorm:"primary_key"`
	Key       string    `gorm:"not null;unique_index;type:VARCHAR(255)"`
	Val       []byte    `gorm:"not null"`
	Encode    bool      `gorm:"not null"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// TableName table name
func (Model) TableName() string {
	return "settings"
}
