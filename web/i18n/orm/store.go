package orm

import "github.com/jinzhu/gorm"

// Store gorm-store
type Store struct {
	Db *gorm.DB `inject:""`
}

//Set set locale
func (p *Store) Set(lang, code, message string, override bool) error {
	var l Model
	if p.Db.Where("lang = ? AND code = ?", lang, code).First(&l).RecordNotFound() {
		l.Lang = lang
		l.Code = code
		l.Message = message
		return p.Db.Create(&l).Error
	}
	if override {
		l.Message = message
		return p.Db.Save(&l).Error
	}

	return nil
}

//Del del locale
func (p *Store) Del(lang, code string) error {
	return p.Db.Where("lang = ? AND code = ?", lang, code).Delete(Model{}).Error
}

// Get get message
func (p *Store) Get(lang, code string) (string, error) {
	var l Model
	if err := p.Db.
		Select("message").
		Where("lang = ? AND code = ?", lang, code).
		First(&l).Error; err != nil {
		return "", err
	}
	return l.Message, nil
}

// Languages languages
func (p *Store) Languages() ([]string, error) {
	var val []string
	err := p.Db.Model(&Model{}).Pluck("DISTINCT lang", &val).Error
	return val, err
}

// All list all items
func (p *Store) All(lang string) (map[string]string, error) {
	var items []Model
	if err := p.Db.
		Select([]string{"code", "message"}).
		Where("lang = ?", lang).
		Find(&items).Error; err != nil {
		return nil, err
	}

	rt := make(map[string]string)
	for _, l := range items {
		rt[l.Code] = l.Message
	}
	return rt, nil
}
