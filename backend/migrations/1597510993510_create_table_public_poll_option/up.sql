CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."poll_option"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
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
CREATE TRIGGER "set_public_poll_option_updated_at"
BEFORE UPDATE ON "public"."poll_option"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_poll_option_updated_at" ON "public"."poll_option" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
