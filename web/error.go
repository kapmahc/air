package web

// HTTPError http error
type HTTPError struct {
	Message string
	Status  int
}

func (p *HTTPError) Error() string {
	return p.Message
}
