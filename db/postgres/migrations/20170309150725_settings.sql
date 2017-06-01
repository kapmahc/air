-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE settings (
  id BIGSERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL,
  val BYTEA NOT NULL,
  encode BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE UNIQUE INDEX idx_settings_key ON settings (key);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE settings;
