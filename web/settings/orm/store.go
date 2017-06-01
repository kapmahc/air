package orm

import "github.com/jinzhu/gorm"

// Store gorm store
type Store struct {
	Db *gorm.DB `inject:""`
}

// Set save
func (p *Store) Set(key string, val []byte, enc bool) error {
	var m Model
	if p.Db.Where("key = ?", key).First(&m).RecordNotFound() {
		return p.Db.Create(&Model{
			Key:    key,
			Val:    val,
			Encode: enc,
		}).Error
	}

	return p.Db.Model(&m).Updates(map[string]interface{}{
		"encode": enc,
		"val":    val,
	}).Error

}

// Get get
func (p *Store) Get(key string) ([]byte, bool, error) {
	var m Model
	err := p.Db.Where("key = ?", key).First(&m).Error
	if err != nil {
		return nil, false, err
	}
	return m.Val, m.Encode, nil
}
