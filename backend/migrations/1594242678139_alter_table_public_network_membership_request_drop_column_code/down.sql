ALTER TABLE "public"."network_membership_request" ADD COLUMN "code" text;
ALTER TABLE "public"."network_membership_request" ALTER COLUMN "code" DROP NOT NULL;
ALTER TABLE "public"."network_membership_request" ADD CONSTRAINT network_membership_request_code_key UNIQUE (code);
