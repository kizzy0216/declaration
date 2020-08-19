ALTER TABLE "public"."content_partial" ADD COLUMN "content_uuid" uuid;
ALTER TABLE "public"."content_partial" ALTER COLUMN "content_uuid" DROP NOT NULL;
