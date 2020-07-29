alter table "public"."network_user_relationship"
           add constraint "network_user_relationship_to_user_uuid_fkey"
           foreign key ("to_user_uuid")
           references "public"."user"
           ("uuid") on update restrict on delete cascade;
