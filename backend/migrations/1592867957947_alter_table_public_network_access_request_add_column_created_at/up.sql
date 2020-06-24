ALTER TABLE "public"."network_access_request" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
