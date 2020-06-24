CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."verification_code"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "id" bigserial NOT NULL, "email" text NOT NULL, PRIMARY KEY ("uuid") );
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
CREATE TRIGGER "set_public_verification_code_updated_at"
BEFORE UPDATE ON "public"."verification_code"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_verification_code_updated_at" ON "public"."verification_code" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
