CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."call_to_action"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "href" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") );
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
CREATE TRIGGER "set_public_call_to_action_updated_at"
BEFORE UPDATE ON "public"."call_to_action"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_call_to_action_updated_at" ON "public"."call_to_action" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
