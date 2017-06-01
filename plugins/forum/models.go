package forum

import (
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
)

// Article article
type Article struct {
	web.Model
	Title   string `json:"title"`
	Summary string `json:"summary"`
	Body    string `json:"body"`
	Type    string `json:"type"`

	UserID   uint      `json:"userId"`
	User     auth.User `json:"user"`
	Tags     []Tag     `json:"tags" gorm:"many2many:forum_articles_tags;"`
	Comments []Comment `json:"comments"`
}

// TableName table name
func (Article) TableName() string {
	return "forum_articles"
}

// Tag tag
type Tag struct {
	web.Model
	Name     string    `json:"name"`
	Articles []Article `json:"articles" gorm:"many2many:forum_articles_tags;"`
}

// TableName table name
func (Tag) TableName() string {
	return "forum_tags"
}

// Comment comment
type Comment struct {
	web.Model
	Body string `json:"body"`
	Type string `json:"type"`

	UserID    uint      `json:"userId"`
	User      auth.User `json:"user"`
	ArticleID uint      `json:"articleId"`
	Article   Article   `json:"article"`
}

// TableName table name
func (Comment) TableName() string {
	return "forum_comments"
}
