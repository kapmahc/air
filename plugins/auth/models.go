package auth

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/kapmahc/air/web"
)

const (
	// RoleAdmin admin role
	RoleAdmin = "admin"
	// RoleRoot root role
	RoleRoot = "root"
	// UserTypeEmail email user
	UserTypeEmail = "email"

	// DefaultResourceType default resource type
	DefaultResourceType = "-"
	// DefaultResourceID default resourc id
	DefaultResourceID = 0
)

// User user
type User struct {
	web.Model

	Name            string     `json:"name"`
	Email           string     `json:"email"`
	UID             string     `json:"uid" gorm:"column:uid"`
	Password        []byte     `json:"-"`
	ProviderID      string     `json:"-"`
	ProviderType    string     `json:"providerType"`
	Home            string     `json:"home"`
	Logo            string     `json:"logo"`
	SignInCount     uint       `json:"signInCount"`
	LastSignInAt    *time.Time `json:"lastSignInAt"`
	LastSignInIP    string     `json:"lastSignInIp"`
	CurrentSignInAt *time.Time `json:"currentSignInAt"`
	CurrentSignInIP string     `json:"currentSignInIp"`
	ConfirmedAt     *time.Time `json:"confirmedAt"`
	LockedAt        *time.Time `json:"lockedAt"`

	Logs []Log `json:"-"`
}

// TableName table name
func (User) TableName() string {
	return "users"
}

// IsConfirm is confirm?
func (p *User) IsConfirm() bool {
	return p.ConfirmedAt != nil
}

// IsLock is lock?
func (p *User) IsLock() bool {
	return p.LockedAt != nil
}

//SetGravatarLogo set logo by gravatar
func (p *User) SetGravatarLogo() {
	buf := md5.Sum([]byte(strings.ToLower(p.Email)))
	p.Logo = fmt.Sprintf("https://gravatar.com/avatar/%s.png", hex.EncodeToString(buf[:]))
}

//SetUID generate uid
func (p *User) SetUID() {
	p.UID = uuid.New().String()
}

func (p User) String() string {
	return fmt.Sprintf("%s<%s>", p.Name, p.Email)
}

// Attachment attachment
type Attachment struct {
	web.Model

	Title        string `json:"title"`
	URL          string `json:"url"`
	Length       int64  `json:"length"`
	MediaType    string `json:"mediaType"`
	ResourceID   uint   `json:"resourceId"`
	ResourceType string `json:"resourceType"`

	UserID uint `json:"userId"`
	User   User `json:"-"`
}

// TableName table name
func (Attachment) TableName() string {
	return "attachments"
}

// IsPicture is picture?
func (p *Attachment) IsPicture() bool {
	return strings.HasPrefix(p.MediaType, "image/")
}

// Log log
type Log struct {
	web.Timestamp

	Message string `json:"message"`
	Type    string `json:"type"`
	IP      string `json:"ip"`

	UserID uint `json:"userId"`
	User   User `json:"-"`
}

// TableName table name
func (Log) TableName() string {
	return "logs"
}

func (p Log) String() string {
	return fmt.Sprintf("%s: [%s]\t %s", p.CreatedAt.Format(time.ANSIC), p.IP, p.Message)
}

// Policy policy
type Policy struct {
	web.Model

	StartUp  time.Time
	ShutDown time.Time

	UserID uint
	User   User
	RoleID uint
	Role   Role
}

//Enable is enable?
func (p *Policy) Enable() bool {
	now := time.Now()
	return now.After(p.StartUp) && now.Before(p.ShutDown)
}

// TableName table name
func (Policy) TableName() string {
	return "policies"
}

// Role role
type Role struct {
	web.Model

	Name         string
	ResourceID   uint
	ResourceType string
}

// TableName table name
func (Role) TableName() string {
	return "roles"
}

func (p Role) String() string {
	return fmt.Sprintf("%s@%s://%d", p.Name, p.ResourceType, p.ResourceID)
}

// Vote vote
type Vote struct {
	web.Model

	Point        int
	ResourceID   uint
	ResourceType string
}

// TableName table name
func (Vote) TableName() string {
	return "votes"
}
