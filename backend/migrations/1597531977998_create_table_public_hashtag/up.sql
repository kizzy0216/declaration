CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."hashtag"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("text"), CONSTRAINT "valid_hashtag" CHECK (text ~ '^#[A-Za-z0-9\-\.\_]+$'));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_hashtag_updated_at"
BEFORE UPDATE ON "public"."hashtag"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_hashtag_updated_at" ON "public"."hashtag" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
