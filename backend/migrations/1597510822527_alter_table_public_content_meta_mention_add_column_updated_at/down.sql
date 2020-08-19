DROP TRIGGER IF EXISTS "set_public_content_meta_mention_updated_at" ON "public"."content_meta_mention";
ALTER TABLE "public"."content_meta_mention" DROP COLUMN "updated_at";
