CREATE TABLE "public"."content_meta_hashtag"("content_meta_uuid" uuid NOT NULL, "hashtag_uuid" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("content_meta_uuid","hashtag_uuid") );
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
CREATE TRIGGER "set_public_content_meta_hashtag_updated_at"
BEFORE UPDATE ON "public"."content_meta_hashtag"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_meta_hashtag_updated_at" ON "public"."content_meta_hashtag" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
