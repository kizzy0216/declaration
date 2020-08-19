CREATE TABLE "public"."content_meta"("content_uuid" uuid NOT NULL, "description" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("content_uuid") , FOREIGN KEY ("content_uuid") REFERENCES "public"."content"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_uuid"));
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
CREATE TRIGGER "set_public_content_meta_updated_at"
BEFORE UPDATE ON "public"."content_meta"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_meta_updated_at" ON "public"."content_meta" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
