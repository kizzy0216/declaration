CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."comment"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "text" text NOT NULL, "creator_uuid" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("creator_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict, UNIQUE ("uuid"), UNIQUE ("id"), UNIQUE ("creator_uuid"));
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
CREATE TRIGGER "set_public_comment_updated_at"
BEFORE UPDATE ON "public"."comment"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_comment_updated_at" ON "public"."comment" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
