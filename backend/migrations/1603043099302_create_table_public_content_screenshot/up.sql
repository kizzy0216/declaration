CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content_screenshot"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "content_uuid" uuid NOT NULL, "original_url" text NOT NULL, "type" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("content_uuid") REFERENCES "public"."content"("uuid") ON UPDATE set null ON DELETE cascade, UNIQUE ("uuid"));
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
CREATE TRIGGER "set_public_content_screenshot_updated_at"
BEFORE UPDATE ON "public"."content_screenshot"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_screenshot_updated_at" ON "public"."content_screenshot" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
