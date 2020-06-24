DROP TRIGGER IF EXISTS "set_public_network_user_updated_at" ON "public"."network_user";
ALTER TABLE "public"."network_user" DROP COLUMN "updated_at";
