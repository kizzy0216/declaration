CREATE EXTENSION IF NOT EXISTS pgcrypto;
ALTER TABLE "public"."content_meta" ADD COLUMN "uuid" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid();
