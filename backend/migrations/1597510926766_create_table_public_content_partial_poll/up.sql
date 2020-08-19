CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content_partial_poll"("content_partial_uuid" uuid NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("content_partial_uuid") REFERENCES "public"."content_partial"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_partial_uuid"), UNIQUE ("uuid"));
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
CREATE TRIGGER "set_public_content_partial_poll_updated_at"
BEFORE UPDATE ON "public"."content_partial_poll"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_partial_poll_updated_at" ON "public"."content_partial_poll" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
