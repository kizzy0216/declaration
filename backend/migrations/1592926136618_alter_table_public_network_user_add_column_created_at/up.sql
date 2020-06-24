ALTER TABLE "public"."network_user" ADD COLUMN "created_at" timestamptz NULL DEFAULT now();
