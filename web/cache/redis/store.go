package redis

import (
	"time"

	_redis "github.com/garyburd/redigo/redis"
	"github.com/kapmahc/air/web/cache"
)

var _ cache.Store = &Store{}

// Store cache by redis
type Store struct {
	Pool *_redis.Pool `inject:""`
}

// Status status
func (p *Store) Status() (string, error) {
	c := p.Pool.Get()
	defer c.Close()
	return _redis.String(c.Do("INFO"))
}

//Flush clear cache items
func (p *Store) Flush() error {
	c := p.Pool.Get()
	defer c.Close()
	keys, err := _redis.Values(c.Do("KEYS", "*"))
	if err == nil && len(keys) > 0 {
		_, err = c.Do("DEL", keys...)
	}
	return err
}

//Keys list cache items
func (p *Store) Keys() ([]string, error) {
	c := p.Pool.Get()
	defer c.Close()
	return _redis.Strings(c.Do("KEYS", "*"))
}

// Set set bytes
func (p *Store) Set(key string, val []byte, ttl time.Duration) error {
	c := p.Pool.Get()
	defer c.Close()
	_, err := c.Do("SET", key, val, "EX", int(ttl/time.Second))
	return err
}

// Get get bytes
func (p *Store) Get(key string) ([]byte, error) {
	c := p.Pool.Get()
	defer c.Close()
	return _redis.Bytes(c.Do("GET", key))
}
