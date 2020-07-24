ALTER TABLE "public"."user_profile" ADD COLUMN "date_of_birth" date;
ALTER TABLE "public"."user_profile" ALTER COLUMN "date_of_birth" DROP NOT NULL;
