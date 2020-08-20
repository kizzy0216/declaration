

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "creator_uuid" uuid NOT NULL, "network_uuid" uuid NOT NULL, "heading" text NOT NULL, "sub_heading" text NOT NULL, "body" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("creator_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("uuid"), UNIQUE ("id"));
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
CREATE TRIGGER "set_public_content_updated_at"
BEFORE UPDATE ON "public"."content"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_updated_at" ON "public"."content" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."content_partial"("content_uuid" uuid NOT NULL, PRIMARY KEY ("content_uuid") , FOREIGN KEY ("content_uuid") REFERENCES "public"."content"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_uuid"));

ALTER TABLE "public"."content" ADD COLUMN "content_partial_uuid" uuid NULL;

ALTER TABLE "public"."content" DROP COLUMN "content_partial_uuid" CASCADE;

alter table "public"."content_partial" drop constraint "content_partial_content_uuid_fkey";

ALTER TABLE "public"."content_partial" ADD COLUMN "uuid" uuid NOT NULL UNIQUE;

ALTER TABLE ONLY "public"."content_partial" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();

alter table "public"."content_partial"
           add constraint "content_partial_content_uuid_fkey"
           foreign key ("content_uuid")
           references "public"."content"
           ("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."content" ADD COLUMN "content_partial_uuid" uuid NULL;

ALTER TABLE "public"."content" ADD CONSTRAINT "content_content_partial_uuid_key" UNIQUE ("content_partial_uuid");

alter table "public"."content_partial" drop constraint "content_partial_pkey";
alter table "public"."content_partial"
    add constraint "content_partial_pkey" 
    primary key ( "uuid" );

alter table "public"."content_partial" drop constraint "content_partial_content_uuid_fkey";

ALTER TABLE "public"."content_partial" DROP COLUMN "content_uuid" CASCADE;

alter table "public"."content"
           add constraint "content_content_partial_uuid_fkey"
           foreign key ("content_partial_uuid")
           references "public"."content_partial"
           ("uuid") on update restrict on delete cascade deferrable initially deferred;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."media"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "original_url" text NOT NULL, "type" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("uuid"), UNIQUE ("id"));
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
CREATE TRIGGER "set_public_media_updated_at"
BEFORE UPDATE ON "public"."media"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_media_updated_at" ON "public"."media" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

ALTER TABLE "public"."content" ADD COLUMN "media_uuid" uuid NULL;

ALTER TABLE "public"."content" ADD CONSTRAINT "content_media_uuid_key" UNIQUE ("media_uuid");

alter table "public"."content"
           add constraint "content_media_uuid_fkey"
           foreign key ("media_uuid")
           references "public"."media"
           ("uuid") on update restrict on delete restrict;

ALTER TABLE "public"."media" ADD COLUMN "alt" text NULL;

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

ALTER TABLE "public"."content" ADD COLUMN "meta_uuid" uuid NOT NULL UNIQUE;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."content_meta" ADD COLUMN "uuid" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid();

alter table "public"."content_meta" drop constraint "content_meta_content_uuid_fkey";

alter table "public"."content_meta" drop constraint "content_meta_pkey";
alter table "public"."content_meta"
    add constraint "content_meta_pkey" 
    primary key ( "uuid" );

alter table "public"."content_meta" drop constraint "content_meta_uuid_key1";

ALTER TABLE "public"."content_meta" DROP COLUMN "content_uuid" CASCADE;

alter table "public"."content"
           add constraint "content_meta_uuid_fkey"
           foreign key ("meta_uuid")
           references "public"."content_meta"
           ("uuid") on update restrict on delete cascade;

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

ALTER TABLE "public"."comment" ADD COLUMN "parent_comment_uuid" uuid NULL;

alter table "public"."comment"
           add constraint "comment_parent_comment_uuid_fkey"
           foreign key ("parent_comment_uuid")
           references "public"."comment"
           ("uuid") on update restrict on delete restrict;

CREATE TABLE "public"."content_comment"("content_uuid" uuid NOT NULL, "comment_uuid" uuid NOT NULL, PRIMARY KEY ("content_uuid","comment_uuid") , FOREIGN KEY ("content_uuid") REFERENCES "public"."content"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("comment_uuid") REFERENCES "public"."comment"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_uuid"), UNIQUE ("comment_uuid"));

alter table "public"."content_comment" drop constraint "content_comment_content_uuid_key";

alter table "public"."content_comment" drop constraint "content_comment_comment_uuid_key";

CREATE TABLE "public"."content_meta_mention"("content_meta_uuid" uuid NOT NULL, "user_uuid" uuid NOT NULL, PRIMARY KEY ("content_meta_uuid","user_uuid") , FOREIGN KEY ("content_meta_uuid") REFERENCES "public"."content_meta"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE "public"."content_meta_mention" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();

ALTER TABLE "public"."content_meta_mention" ADD COLUMN "updated_at" timestamptz NULL DEFAULT now();

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
CREATE TRIGGER "set_public_content_meta_mention_updated_at"
BEFORE UPDATE ON "public"."content_meta_mention"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_meta_mention_updated_at" ON "public"."content_meta_mention" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content_partial_poll"("content_partial_uuid" uuid NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("content_partial_uuid") REFERENCES "public"."content_partial"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_partial_uuid"), UNIQUE ("uuid"));
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
CREATE TRIGGER "set_public_content_partial_poll_updated_at"
BEFORE UPDATE ON "public"."content_partial_poll"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_partial_poll_updated_at" ON "public"."content_partial_poll" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."poll_option"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
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
CREATE TRIGGER "set_public_poll_option_updated_at"
BEFORE UPDATE ON "public"."poll_option"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_poll_option_updated_at" ON "public"."poll_option" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."content_partial_poll_option"("content_partial_uuid" uuid NOT NULL, "poll_option_uuid" uuid NOT NULL, PRIMARY KEY ("content_partial_uuid","poll_option_uuid") , FOREIGN KEY ("content_partial_uuid") REFERENCES "public"."content_partial"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("poll_option_uuid") REFERENCES "public"."poll_option"("uuid") ON UPDATE restrict ON DELETE cascade);

alter table "public"."content_partial_poll_option" drop constraint "content_partial_poll_option_content_partial_uuid_fkey";

alter table "public"."content_partial_poll_option" rename column "content_partial_uuid" to "content_partial_poll_uuid";

alter table "public"."content_partial_poll_option"
           add constraint "content_partial_poll_option_content_partial_poll_uuid_fkey"
           foreign key ("content_partial_poll_uuid")
           references "public"."content_partial_poll"
           ("uuid") on update restrict on delete cascade;

CREATE TABLE "public"."content_partial_poll_vote"("content_partial_poll_uuid" uuid NOT NULL, "poll_option_uuid" uuid NOT NULL, "voter_uuid" uuid NOT NULL, PRIMARY KEY ("content_partial_poll_uuid","poll_option_uuid") , FOREIGN KEY ("content_partial_poll_uuid") REFERENCES "public"."content_partial_poll"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("poll_option_uuid") REFERENCES "public"."poll_option"("uuid") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("voter_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict, UNIQUE ("content_partial_poll_uuid", "voter_uuid"));

CREATE TABLE "public"."content_star"("content_uuid" uuid NOT NULL, "astronomer_uuid" uuid NOT NULL, "amount" integer NOT NULL, PRIMARY KEY ("content_uuid","astronomer_uuid") , FOREIGN KEY ("content_uuid") REFERENCES "public"."content"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("astronomer_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict, CONSTRAINT "star_amount_range" CHECK (amount > 0 and amount <=100));

alter table "public"."content_comment" add constraint "content_comment_content_uuid_comment_uuid_key" unique ("content_uuid", "comment_uuid");

alter table "public"."content_comment" drop constraint "content_comment_content_uuid_comment_uuid_key";

alter table "public"."content_comment" add constraint "content_comment_comment_uuid_key" unique ("comment_uuid");

ALTER TABLE "public"."media" ADD COLUMN "uploader_uuid" uuid NOT NULL;

alter table "public"."media"
           add constraint "media_uploader_uuid_fkey"
           foreign key ("uploader_uuid")
           references "public"."user"
           ("uuid") on update restrict on delete cascade;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."hashtag"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , UNIQUE ("text"), CONSTRAINT "valid_hashtag" CHECK (text ~ '^#[A-Za-z0-9\-\.\_]+$'));
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
CREATE TRIGGER "set_public_hashtag_updated_at"
BEFORE UPDATE ON "public"."hashtag"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_hashtag_updated_at" ON "public"."hashtag" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

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

alter table "public"."content_meta_hashtag"
           add constraint "content_meta_hashtag_hashtag_uuid_fkey"
           foreign key ("hashtag_uuid")
           references "public"."hashtag"
           ("uuid") on update restrict on delete restrict;

alter table "public"."content_meta_hashtag"
           add constraint "content_meta_hashtag_content_meta_uuid_fkey"
           foreign key ("content_meta_uuid")
           references "public"."content_meta"
           ("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."content" ALTER COLUMN "heading" DROP NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "sub_heading" DROP NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "body" DROP NOT NULL;

alter table "public"."content" drop constraint "content_uuid_fkey",
             add constraint "content_network_uuid_fkey"
             foreign key ("network_uuid")
             references "public"."network"
             ("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."content_meta" ALTER COLUMN "description" DROP NOT NULL;

alter table "public"."content_partial_poll" drop constraint "content_partial_poll_content_partial_uuid_key";

alter table "public"."content_partial_poll" add constraint "content_partial_poll_content_partial_uuid_key" unique ("content_partial_uuid");

ALTER TABLE "public"."media" ADD COLUMN "original_width" integer NULL;

ALTER TABLE "public"."media" ADD COLUMN "original_height" integer NULL;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content_partial_opportunity_listing"("content_partial_uuid" uuid NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("content_partial_uuid") REFERENCES "public"."content_partial"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_partial_uuid"));
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
CREATE TRIGGER "set_public_content_partial_opportunity_listing_updated_at"
BEFORE UPDATE ON "public"."content_partial_opportunity_listing"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_partial_opportunity_listing_updated_at" ON "public"."content_partial_opportunity_listing" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."content_partial_opportunity_listing_criteria"("content_partial_opportunity_listing_uuid" uuid NOT NULL, "opportunity_listing_criteria_uuid" uuid NOT NULL, PRIMARY KEY ("content_partial_opportunity_listing_uuid","opportunity_listing_criteria_uuid") );

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

alter table "public"."content_partial_opportunity_listing_criteria"
           add constraint "content_partial_opportunity_listing_criteria_opportunity_lis"
           foreign key ("opportunity_listing_criteria_uuid")
           references "public"."opportunity_listing_criteria"
           ("uuid") on update restrict on delete restrict;

alter table "public"."content_partial_opportunity_listing_criteria"
           add constraint "content_partial_opportunity_listing_criteria_content_partial"
           foreign key ("content_partial_opportunity_listing_uuid")
           references "public"."content_partial_opportunity_listing"
           ("uuid") on update restrict on delete cascade;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."content_partial_availability_listing"("content_partial_uuid" uuid NOT NULL, "uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("content_partial_uuid") REFERENCES "public"."content_partial"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("content_partial_uuid"));
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
CREATE TRIGGER "set_public_content_partial_availability_listing_updated_at"
BEFORE UPDATE ON "public"."content_partial_availability_listing"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_content_partial_availability_listing_updated_at" ON "public"."content_partial_availability_listing" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."availability_listing_credential"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "text" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") );
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
CREATE TRIGGER "set_public_availability_listing_credential_updated_at"
BEFORE UPDATE ON "public"."availability_listing_credential"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_availability_listing_credential_updated_at" ON "public"."availability_listing_credential" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."content_partial_availability_listing_credential"("content_partial_availability_listing_uuid" uuid NOT NULL, "availability_listing_credential_uuid" uuid NOT NULL, PRIMARY KEY ("content_partial_availability_listing_uuid","availability_listing_credential_uuid") , FOREIGN KEY ("content_partial_availability_listing_uuid") REFERENCES "public"."content_partial_availability_listing"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("availability_listing_credential_uuid") REFERENCES "public"."availability_listing_credential"("uuid") ON UPDATE restrict ON DELETE restrict);

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" SET NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "meta_uuid" DROP NOT NULL;

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;

ALTER TABLE "public"."availability_listing_credential" ADD COLUMN "creator_uuid" uuid NOT NULL;

alter table "public"."availability_listing_credential"
           add constraint "availability_listing_credential_creator_uuid_fkey"
           foreign key ("creator_uuid")
           references "public"."user"
           ("uuid") on update restrict on delete restrict;

ALTER TABLE "public"."content_partial" ADD COLUMN "creator_uuid" uuid NOT NULL;

alter table "public"."content_partial"
           add constraint "content_partial_creator_uuid_fkey"
           foreign key ("creator_uuid")
           references "public"."user"
           ("uuid") on update restrict on delete restrict;

ALTER TABLE "public"."content_partial" DROP COLUMN "creator_uuid" CASCADE;

ALTER TABLE "public"."content_partial" ADD COLUMN "content_uuid" uuid NOT NULL;

alter table "public"."content_partial"
           add constraint "content_partial_content_uuid_fkey"
           foreign key ("content_uuid")
           references "public"."content"
           ("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."availability_listing_credential" DROP COLUMN "creator_uuid" CASCADE;

alter table "public"."content_partial" add constraint "content_partial_content_uuid_key" unique ("content_uuid");

ALTER TABLE "public"."content" DROP COLUMN "content_partial_uuid" CASCADE;
