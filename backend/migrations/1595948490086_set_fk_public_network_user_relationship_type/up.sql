alter table "public"."network_user_relationship"
           add constraint "network_user_relationship_type_fkey"
           foreign key ("type")
           references "public"."network_user_relationship_type"
           ("text") on update restrict on delete restrict;
