package site

import (
	"time"

	"github.com/kapmahc/air/web"
)

// Post post
type Post struct {
	web.Media

	Name  string `json:"name"`
	Title string `json:"title"`
}

// TableName table name
func (Post) TableName() string {
	return "posts"
}

// Notice notice
type Notice struct {
	web.Media
}

// TableName table name
func (Notice) TableName() string {
	return "notices"
}

// LeaveWord leave-word
type LeaveWord struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	CreatedAt time.Time `json:"createdAt"`
	Body      string    `json:"body"`
	Type      string    `json:"type"`
}

// TableName table name
func (LeaveWord) TableName() string {
	return "leave_words"
}

// Link link
type Link struct {
	web.Model
	Loc       string `json:"loc"`
	Href      string `json:"href"`
	Label     string `json:"label"`
	SortOrder int    `json:"sortOrder"`
}

// TableName table name
func (Link) TableName() string {
	return "links"
}

// Card card
type Card struct {
	web.Model

	Loc       string `json:"loc"`
	Title     string `json:"title"`
	Summary   string `json:"summary"`
	Href      string `json:"href"`
	Logo      string `json:"logo"`
	SortOrder int    `json:"sortOrder"`
	Action    string `json:"action"`
}

// TableName table name
func (Card) TableName() string {
	return "cards"
}

// FriendLink friend_links
type FriendLink struct {
	web.Model

	Title     string `json:"title"`
	Home      string `json:"Home"`
	Logo      string `json:"logo"`
	SortOrder int    `json:"sortOrder"`
}

// TableName table name
func (FriendLink) TableName() string {
	return "friend_links"
}
