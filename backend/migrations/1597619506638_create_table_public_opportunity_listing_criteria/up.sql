CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."opportunity_listing_criteria"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") );
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
CREATE TRIGGER "set_public_opportunity_listing_criteria_updated_at"
BEFORE UPDATE ON "public"."opportunity_listing_criteria"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_opportunity_listing_criteria_updated_at" ON "public"."opportunity_listing_criteria" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
