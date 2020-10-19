ALTER TABLE "public"."content" ADD COLUMN "screenshot_uuid" uuid;
ALTER TABLE "public"."content" ALTER COLUMN "screenshot_uuid" DROP NOT NULL;
