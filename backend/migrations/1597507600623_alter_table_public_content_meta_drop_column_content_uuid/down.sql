ALTER TABLE "public"."content_meta" ADD COLUMN "content_uuid" uuid;
ALTER TABLE "public"."content_meta" ALTER COLUMN "content_uuid" DROP NOT NULL;
