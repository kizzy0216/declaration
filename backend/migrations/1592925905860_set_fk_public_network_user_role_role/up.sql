alter table "public"."network_user_role"
           add constraint "network_user_role_role_fkey"
           foreign key ("role")
           references "public"."user_role"
           ("text") on update restrict on delete restrict;
