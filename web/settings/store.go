package settings

// Store store
type Store interface {
	Set(key string, val []byte, encode bool) error
	Get(key string) ([]byte, bool, error)
}
