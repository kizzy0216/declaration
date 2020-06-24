DROP TRIGGER IF EXISTS "set_public_network_access_request_updated_at" ON "public"."network_access_request";
ALTER TABLE "public"."network_access_request" DROP COLUMN "updated_at";
