package forms

import (
	"time"

	"github.com/kapmahc/air/web"
)

// Form form
type Form struct {
	web.Media

	Deadline time.Time `json:"deadline"`
	Title    string    `json:"title"`

	Fields  []Field  `json:"fields"`
	Records []Record `json:"records"`
}

// Expire expire?
func (p *Form) Expire() bool {
	return time.Now().After(p.Deadline)
}

// TableName table name
func (Form) TableName() string {
	return "forms_models"
}

// Field field
type Field struct {
	web.Media

	Name      string
	Label     string
	Value     string
	SortOrder int

	FormID uint
	Form   Form
}

// TableName table name
func (Field) TableName() string {
	return "forms_fields"
}

// Record record
type Record struct {
	web.Model

	Username string
	Email    string
	Phone    string
	Value    string

	FormID uint
	Form   Form
}

// TableName table name
func (Record) TableName() string {
	return "forms_records"
}
