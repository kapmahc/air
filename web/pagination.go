package web

import (
	"net/http"
	"strconv"
)

// NewPagination new pagination
func NewPagination(r *http.Request, total int64) *Pagination {
	page, _ := strconv.ParseInt(r.URL.Query().Get("page"), 10, 64)
	size, _ := strconv.ParseInt(r.URL.Query().Get("size"), 10, 64)

	if size <= 0 || size >= 60 {
		size = 60
	}
	if page <= 0 {
		page = 1
	}
	if page*size > total {
		page = total / size
		if total%size != 0 {
			page++
		}
	}

	var count = total / size
	if total < size {
		count = 1
	} else if total%page != 0 {
		count++
	}

	// ------------
	var ids []int64
	ln := int64(8)
	begin := int64(1)
	end := count
	if count > ln {
		begin = page - ln/2
		end = page + ln/2

		if end >= count {
			end = count
			begin = count - ln
		}
		if begin < 1 {
			begin = 1
			end = ln
		}
	}
	for i := begin; i <= end; i++ {
		ids = append(ids, i)
	}

	return &Pagination{
		Href:  r.URL.Path,
		Page:  page,
		Size:  size,
		Total: total,
		Count: count,
		Items: make([]interface{}, 0),
		Ids:   ids,
	}
}

// Pagination pagination
type Pagination struct {
	Href  string        `json:"href"`
	Page  int64         `json:"page"`
	Size  int64         `json:"size"`
	Total int64         `json:"total"`
	Count int64         `json:"count"`
	Items []interface{} `json:"items"`
	Ids   []int64       `json:"ids"`
}

// Limit limit
func (p *Pagination) Limit() int64 {
	return p.Size
}

// Offset offset
func (p *Pagination) Offset() int64 {
	return (p.Page - 1) * p.Size
}
