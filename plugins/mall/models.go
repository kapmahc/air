package mall

import (
	"github.com/kapmahc/air/plugins/auth"
	"github.com/kapmahc/air/web"
)

// Address address
type Address struct {
	web.Model

	Username string `json:"username"`
	Zip      string `json:"zip"`
	Street   string `json:"street"`
	City     string `json:"city"`
	State    string `json:"state"`
	Country  string `json:"country"`
	Phone    string `json:"phone"`

	UserID uint      `json:"userId"`
	User   auth.User `json:"user"`
}

// TableName table name
func (Address) TableName() string {
	return "mall_addresses"
}

// Meta meta
type Meta struct {
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
}

// Store Store
type Store struct {
	web.Model
	Meta

	Currency string `json:"currency"`

	AddressID uint      `json:"addressId"`
	Address   Address   `json:"address"`
	OwnerID   uint      `json:"userId"`
	Owner     auth.User `json:"user"`
}

// TableName table name
func (Store) TableName() string {
	return "mall_stores"
}

// Tag tag
type Tag struct {
	web.Model
	Meta
}

// TableName table name
func (Tag) TableName() string {
	return "mall_tags"
}

// Vendor vendor
type Vendor struct {
	web.Model
	Meta

	Products []Product `json:"products"`
}

// TableName table name
func (Vendor) TableName() string {
	return "mall_vendors"
}

// Product product
type Product struct {
	web.Model
	Meta

	VendorID uint   `json:"vendorId"`
	Vendor   Vendor `json:"vendor"`
	Tags     []Tag  `json:"tags"`
}

// TableName table name
func (Product) TableName() string {
	return "mall_products"
}

// Variant Variant
type Variant struct {
	web.Model

	Sku    string  `json:"sku"`
	Price  float64 `json:"price"`
	Cost   float64 `json:"cost"`
	Weight float64 `json:"weight"`
	Height float64 `json:"height"`
	Length float64 `json:"length"`
	Width  float64 `json:"width"`

	ProductID uint    `json:"productId"`
	Product   Product `json:"product"`
}

// TableName table name
func (Variant) TableName() string {
	return "mall_variants"
}

// Journal Journal
type Journal struct {
	web.Model

	Action   string `json:"action"`
	Quantity int    `json:"quantity"`

	VariantID uint      `json:"variantId"`
	Variant   Variant   `json:"vairant"`
	StoreID   uint      `json:"storeId"`
	Store     Store     `json:"store"`
	UserID    uint      `json:"userId"`
	User      auth.User `json:"user"`
}

// TableName table name
func (Journal) TableName() string {
	return "mall_journals"
}

// Stock Stock
type Stock struct {
	web.Model

	Quantity int `json:"quantity"`

	VariantID uint    `json:"variantId"`
	Variant   Variant `json:"variant"`
	StoreID   uint    `json:"storeId"`
	Store     Store   `json:"store"`
}

// TableName table name
func (Stock) TableName() string {
	return "mall_stocks"
}

// Property Property
type Property struct {
	web.Model

	Key string `json:"key"`
	Val string `json:"val"`

	VariantID uint    `json:"variantId"`
	Variant   Variant `json:"variant"`
}

// TableName table name
func (Property) TableName() string {
	return "mall_properties"
}
