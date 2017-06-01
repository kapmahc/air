-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE forms_models (
  id         BIGSERIAL PRIMARY KEY,
  title      VARCHAR(255)                NOT NULL,
  body       TEXT                        NOT NULL,
  type       VARCHAR(8)                  NOT NULL DEFAULT 'markdown',
  deadline   DATE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX idx_forms_models_type
  ON forms_models (type);

CREATE TABLE forms_fields (
  id         BIGSERIAL PRIMARY KEY,
  label      VARCHAR(255)                NOT NULL,
  name       VARCHAR(255)                NOT NULL,
  value      VARCHAR(255)                NOT NULL,
  body       TEXT                        NOT NULL,
  type       VARCHAR(16)                 NOT NULL DEFAULT 'text',
  required   BOOLEAN                     NOT NULL DEFAULT TRUE,
  form_id    BIGINT                      REFERENCES forms_models,
  sort_order INT                         NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE UNIQUE INDEX idx_forms_fields_name_form_id
  ON forms_fields (name, form_id);

CREATE TABLE forms_records (
  id         BIGSERIAL PRIMARY KEY,
  username   VARCHAR(255)                NOT NULL,
  email      VARCHAR(255)                NOT NULL,
  phone      VARCHAR(255)                NOT NULL,
  value      TEXT                        NOT NULL,
  form_id    BIGINT                      REFERENCES forms_models,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE UNIQUE INDEX idx_forms_fields_email_form
  ON forms_records (email, form_id);
CREATE UNIQUE INDEX idx_forms_fields_phone_phone
  ON forms_records (phone, form_id);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back

DROP TABLE forms_records;
DROP TABLE forms_fields;
DROP TABLE forms_models;
