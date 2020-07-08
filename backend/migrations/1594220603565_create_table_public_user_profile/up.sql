CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user_profile"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "user_uuid" uuid NOT NULL, "username" text NOT NULL, "date_of_birth" date NOT NULL, "location" text, "gender" text, "personal_bio" text, "work_bio" text, "work_title" text, "work_place" text, "educational_institution" text, "photo" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("user_uuid"), UNIQUE ("username"));
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
CREATE TRIGGER "set_public_user_profile_updated_at"
BEFORE UPDATE ON "public"."user_profile"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_profile_updated_at" ON "public"."user_profile" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
