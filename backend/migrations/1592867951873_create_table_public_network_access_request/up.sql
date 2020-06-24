CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."network_access_request"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "id" bigserial NOT NULL, "requester_name" text NOT NULL, "community_name" text NOT NULL, "body" text, "requester_email" text NOT NULL, PRIMARY KEY ("uuid") , UNIQUE ("uuid"));
