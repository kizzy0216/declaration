alter table "public"."verification_code"
           add constraint "verification_code_email_fkey"
           foreign key ("email")
           references "public"."user"
           ("email") on update restrict on delete cascade;
