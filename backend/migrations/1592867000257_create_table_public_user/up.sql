CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"), UNIQUE ("id"));
