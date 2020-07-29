CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."network_user_relationship"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "network_uuid" uuid NOT NULL, "from_user_uuid" uuid NOT NULL, "to_user_uuid" uuid NOT NULL, "type" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("uuid"), UNIQUE ("id"), UNIQUE ("from_user_uuid", "to_user_uuid"));
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
CREATE TRIGGER "set_public_network_user_relationship_updated_at"
BEFORE UPDATE ON "public"."network_user_relationship"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_network_user_relationship_updated_at" ON "public"."network_user_relationship" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
