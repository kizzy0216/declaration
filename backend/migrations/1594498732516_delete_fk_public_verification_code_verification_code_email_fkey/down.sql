alter table "public"."verification_code" add foreign key ("email") references "public"."user"("email") on update restrict on delete cascade;
