CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."conversation"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "network_uuid" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE cascade ON DELETE cascade, UNIQUE ("uuid"));
