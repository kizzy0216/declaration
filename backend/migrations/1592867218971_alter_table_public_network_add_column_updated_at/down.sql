DROP TRIGGER IF EXISTS "set_public_network_updated_at" ON "public"."network";
ALTER TABLE "public"."network" DROP COLUMN "updated_at";
