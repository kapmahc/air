package uploader

import "mime/multipart"

// Store attachment uploader store
type Store interface {
	Save(*multipart.FileHeader) (string, int64, error)
	Remove(string) error
}
