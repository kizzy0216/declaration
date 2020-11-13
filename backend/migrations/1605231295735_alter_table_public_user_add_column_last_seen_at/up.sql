ALTER TABLE "public"."user" ADD COLUMN "last_seen_at" timestamptz NOT NULL DEFAULT now();
