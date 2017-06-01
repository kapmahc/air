package fs

import (
	"io"
	"mime/multipart"
	"os"
	"path"

	"github.com/google/uuid"
	"github.com/kapmahc/air/web/uploader"
)

var _ uploader.Store = &Store{}

// New new file-system uploader store
func New(root, home string) (uploader.Store, error) {
	err := os.MkdirAll(root, 0755)
	return &Store{home: home, root: root}, err
}

// Store file-system storage
type Store struct {
	home string
	root string
}

// Remove remove file
func (p *Store) Remove(url string) error {
	return os.Remove(path.Join(p.root, url[len(p.home)+1:]))
}

// Save save file to file-system
func (p *Store) Save(fh *multipart.FileHeader) (string, int64, error) {
	name := uuid.New().String() + path.Ext(fh.Filename)
	src, err := fh.Open()
	if err != nil {
		return "", 0, err
	}
	defer src.Close()
	dst, err := os.Create(path.Join(p.root, name))
	if err != nil {
		return "", 0, err
	}
	defer dst.Close()
	size, err := io.Copy(dst, src)
	return p.home + "/" + name, size, err
}
