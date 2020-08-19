ALTER TABLE "public"."content" ADD COLUMN "content_partial_uuid" uuid;
ALTER TABLE "public"."content" ALTER COLUMN "content_partial_uuid" DROP NOT NULL;
