ALTER TABLE "public"."verification_code" ADD COLUMN "redirect" text;
ALTER TABLE "public"."verification_code" ALTER COLUMN "redirect" DROP NOT NULL;
