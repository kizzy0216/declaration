CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."media"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "original_url" text NOT NULL, "type" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("uuid"), UNIQUE ("id"));
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
CREATE TRIGGER "set_public_media_updated_at"
BEFORE UPDATE ON "public"."media"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_media_updated_at" ON "public"."media" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
