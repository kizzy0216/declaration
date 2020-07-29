alter table "public"."network_user_relationship"
           add constraint "network_user_relationship_uuid_fkey"
           foreign key ("uuid")
           references "public"."user"
           ("uuid") on update restrict on delete cascade;
