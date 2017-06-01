package forms

import (
	"time"

	"github.com/kapmahc/air/web"
)

const (
	// TypeCheckboxs checkboxs
	TypeCheckboxs = "checkboxs"
	// TypeRadios radios
	TypeRadios = "radios"
)

// Form form
type Form struct {
	web.Media

	Deadline time.Time
	Title    string

	Fields  []Field
	Records []Record
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
