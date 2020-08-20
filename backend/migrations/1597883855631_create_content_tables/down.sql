
ALTER TABLE "public"."content" ADD COLUMN "content_partial_uuid" uuid;
ALTER TABLE "public"."content" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;
ALTER TABLE "public"."content" ADD CONSTRAINT content_content_partial_uuid_fkey FOREIGN KEY (content_partial_uuid) REFERENCES "public"."content_partial" (uuid) ON DELETE cascade ON UPDATE restrict;
ALTER TABLE "public"."content" ADD CONSTRAINT content_content_partial_uuid_key UNIQUE (content_partial_uuid);

alter table "public"."content_partial" drop constraint "content_partial_content_uuid_key";

ALTER TABLE "public"."availability_listing_credential" ADD COLUMN "creator_uuid" uuid;
ALTER TABLE "public"."availability_listing_credential" ALTER COLUMN "creator_uuid" DROP NOT NULL;
ALTER TABLE "public"."availability_listing_credential" ADD CONSTRAINT availability_listing_credential_creator_uuid_fkey FOREIGN KEY (creator_uuid) REFERENCES "public"."user" (uuid) ON DELETE restrict ON UPDATE restrict;

alter table "public"."content_partial" drop constraint "content_partial_content_uuid_fkey";

ALTER TABLE "public"."content_partial" DROP COLUMN "content_uuid";

ALTER TABLE "public"."content_partial" ADD COLUMN "creator_uuid" uuid;
ALTER TABLE "public"."content_partial" ALTER COLUMN "creator_uuid" DROP NOT NULL;
ALTER TABLE "public"."content_partial" ADD CONSTRAINT content_partial_creator_uuid_fkey FOREIGN KEY (creator_uuid) REFERENCES "public"."user" (uuid) ON DELETE restrict ON UPDATE restrict;

alter table "public"."content_partial" drop constraint "content_partial_creator_uuid_fkey";

ALTER TABLE "public"."content_partial" DROP COLUMN "creator_uuid";

alter table "public"."availability_listing_credential" drop constraint "availability_listing_credential_creator_uuid_fkey";

ALTER TABLE "public"."availability_listing_credential" DROP COLUMN "creator_uuid";

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" SET NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "meta_uuid" SET NOT NULL;

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;

ALTER TABLE "public"."content_partial_poll" ALTER COLUMN "content_partial_uuid" SET NOT NULL;


DROP TABLE "public"."content_partial_availability_listing_credential";

DROP TABLE "public"."availability_listing_credential";

DROP TABLE "public"."content_partial_availability_listing";

alter table "public"."content_partial_opportunity_listing_criteria" drop constraint "content_partial_opportunity_listing_criteria_content_partial";

alter table "public"."content_partial_opportunity_listing_criteria" drop constraint "content_partial_opportunity_listing_criteria_opportunity_lis";

DROP TABLE "public"."opportunity_listing_criteria";

DROP TABLE "public"."content_partial_opportunity_listing_criteria";

DROP TABLE "public"."content_partial_opportunity_listing";

ALTER TABLE "public"."media" DROP COLUMN "original_height";

ALTER TABLE "public"."media" DROP COLUMN "original_width";

alter table "public"."content_partial_poll" drop constraint "content_partial_poll_content_partial_uuid_key";

alter table "public"."content_partial_poll" add constraint "content_partial_poll_content_partial_uuid_key" unique ("content_partial_uuid");

ALTER TABLE "public"."content_meta" ALTER COLUMN "description" SET NOT NULL;

alter table "public"."content" drop constraint "content_network_uuid_fkey",
          add constraint "content_uuid_fkey"
          foreign key ("uuid")
          references "public"."network"
          ("uuid")
          on update restrict
          on delete cascade;

ALTER TABLE "public"."content" ALTER COLUMN "body" SET NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "sub_heading" SET NOT NULL;

ALTER TABLE "public"."content" ALTER COLUMN "heading" SET NOT NULL;

alter table "public"."content_meta_hashtag" drop constraint "content_meta_hashtag_content_meta_uuid_fkey";

alter table "public"."content_meta_hashtag" drop constraint "content_meta_hashtag_hashtag_uuid_fkey";

DROP TABLE "public"."content_meta_hashtag";

DROP TABLE "public"."hashtag";

alter table "public"."media" drop constraint "media_uploader_uuid_fkey";

ALTER TABLE "public"."media" DROP COLUMN "uploader_uuid";

alter table "public"."content_comment" drop constraint "content_comment_comment_uuid_key";

alter table "public"."content_comment" add constraint "content_comment_content_uuid_comment_uuid_key" unique ("content_uuid", "comment_uuid");

alter table "public"."content_comment" drop constraint "content_comment_content_uuid_comment_uuid_key";

DROP TABLE "public"."content_star";

DROP TABLE "public"."content_partial_poll_vote";

alter table "public"."content_partial_poll_option" drop constraint "content_partial_poll_option_content_partial_poll_uuid_fkey";

alter table "public"."content_partial_poll_option" rename column "content_partial_poll_uuid" to "content_partial_uuid";

alter table "public"."content_partial_poll_option" add foreign key ("content_partial_uuid") references "public"."content_partial"("uuid") on update restrict on delete cascade;

DROP TABLE "public"."content_partial_poll_option";

DROP TABLE "public"."poll_option";

DROP TABLE "public"."content_partial_poll";

DROP TRIGGER IF EXISTS "set_public_content_meta_mention_updated_at" ON "public"."content_meta_mention";
ALTER TABLE "public"."content_meta_mention" DROP COLUMN "updated_at";

ALTER TABLE "public"."content_meta_mention" DROP COLUMN "created_at";

DROP TABLE "public"."content_meta_mention";

alter table "public"."content_comment" add constraint "content_comment_comment_uuid_key" unique ("comment_uuid");

alter table "public"."content_comment" add constraint "content_comment_content_uuid_key" unique ("content_uuid");

DROP TABLE "public"."content_comment";

alter table "public"."comment" drop constraint "comment_parent_comment_uuid_fkey";

ALTER TABLE "public"."comment" DROP COLUMN "parent_comment_uuid";

DROP TABLE "public"."comment";

alter table "public"."content" drop constraint "content_meta_uuid_fkey";

ALTER TABLE "public"."content_meta" ADD COLUMN "content_uuid" uuid;
ALTER TABLE "public"."content_meta" ALTER COLUMN "content_uuid" DROP NOT NULL;

alter table "public"."content_meta" add constraint "content_meta_uuid_key" unique ("uuid");

alter table "public"."content_meta" drop constraint "content_meta_pkey";
alter table "public"."content_meta"
    add constraint "content_meta_pkey" 
    primary key ( "content_uuid" );

alter table "public"."content_meta" add foreign key ("content_uuid") references "public"."content"("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."content_meta" DROP COLUMN "uuid";

ALTER TABLE "public"."content" DROP COLUMN "meta_uuid";

DROP TABLE "public"."content_meta";

ALTER TABLE "public"."media" DROP COLUMN "alt";

alter table "public"."content" drop constraint "content_media_uuid_fkey";

ALTER TABLE "public"."content" DROP CONSTRAINT "content_media_uuid_key";

ALTER TABLE "public"."content" DROP COLUMN "media_uuid";

DROP TABLE "public"."media";

alter table "public"."content" drop constraint "content_content_partial_uuid_fkey";

ALTER TABLE "public"."content_partial" ADD COLUMN "content_uuid" uuid;
ALTER TABLE "public"."content_partial" ALTER COLUMN "content_uuid" DROP NOT NULL;

alter table "public"."content_partial" add foreign key ("content_uuid") references "public"."content"("uuid") on update restrict on delete cascade;

alter table "public"."content_partial" drop constraint "content_partial_pkey";
alter table "public"."content_partial"
    add constraint "content_partial_pkey" 
    primary key ( "content_uuid" );

ALTER TABLE "public"."content" DROP CONSTRAINT "content_content_partial_uuid_key";

ALTER TABLE "public"."content" DROP COLUMN "content_partial_uuid";

alter table "public"."content_partial" drop constraint "content_partial_content_uuid_fkey";

ALTER TABLE ONLY "public"."content_partial" ALTER COLUMN "uuid" DROP DEFAULT;

ALTER TABLE "public"."content_partial" DROP COLUMN "uuid";

alter table "public"."content_partial" add foreign key ("content_uuid") references "public"."content"("uuid") on update restrict on delete cascade;

ALTER TABLE "public"."content" ADD COLUMN "content_partial_uuid" uuid;
ALTER TABLE "public"."content" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;

ALTER TABLE "public"."content" DROP COLUMN "content_partial_uuid";

DROP TABLE "public"."content_partial";

DROP TABLE "public"."content";
