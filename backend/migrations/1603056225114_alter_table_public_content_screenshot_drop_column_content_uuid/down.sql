ALTER TABLE "public"."content_screenshot" ADD COLUMN "content_uuid" uuid;
ALTER TABLE "public"."content_screenshot" ALTER COLUMN "content_uuid" DROP NOT NULL;
ALTER TABLE "public"."content_screenshot" ADD CONSTRAINT content_screenshot_content_uuid_fkey FOREIGN KEY (content_uuid) REFERENCES "public"."content" (uuid) ON DELETE cascade ON UPDATE set null;
