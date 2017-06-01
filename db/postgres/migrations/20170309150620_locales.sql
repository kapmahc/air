-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE locales (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(255) NOT NULL,
  lang VARCHAR(8) NOT NULL DEFAULT 'en-US',
  message TEXT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE UNIQUE INDEX idx_locales_code_lang ON locales (code, lang);
CREATE INDEX idx_locales_code ON locales (code);
CREATE INDEX idx_locales_lang ON locales (lang);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE locales;
