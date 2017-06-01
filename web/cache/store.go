package cache

import "time"

// Store store
type Store interface {
	Set(key string, val []byte, ttl time.Duration) error
	Get(key string) ([]byte, error)
	Flush() error
	Keys() ([]string, error)
	Status() (string, error)
}
