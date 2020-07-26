CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."network_user_profile"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "network_uuid" uuid NOT NULL, "user_uuid" uuid NOT NULL, "problem_bio" text NOT NULL, "solution_bio" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("uuid"), UNIQUE ("id"));
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
CREATE TRIGGER "set_public_network_user_profile_updated_at"
BEFORE UPDATE ON "public"."network_user_profile"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_network_user_profile_updated_at" ON "public"."network_user_profile" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
