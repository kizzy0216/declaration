ALTER TABLE ONLY "public"."network_membership_invitation" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();
