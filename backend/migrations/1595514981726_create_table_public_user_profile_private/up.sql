CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user_profile_private"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "gender" text NOT NULL, "date_of_birth" date NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_profile_uuid" uuid NOT NULL, PRIMARY KEY ("uuid") , FOREIGN KEY ("user_profile_uuid") REFERENCES "public"."user_profile"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("uuid"), UNIQUE ("id"), UNIQUE ("user_profile_uuid"));
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
CREATE TRIGGER "set_public_user_profile_private_updated_at"
BEFORE UPDATE ON "public"."user_profile_private"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_profile_private_updated_at" ON "public"."user_profile_private" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
