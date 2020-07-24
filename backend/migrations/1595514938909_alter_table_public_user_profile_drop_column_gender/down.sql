ALTER TABLE "public"."user_profile" ADD COLUMN "gender" text;
ALTER TABLE "public"."user_profile" ALTER COLUMN "gender" DROP NOT NULL;
