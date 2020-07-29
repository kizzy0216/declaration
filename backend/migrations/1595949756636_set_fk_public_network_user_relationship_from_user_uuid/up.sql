alter table "public"."network_user_relationship" drop constraint "network_user_relationship_uuid_fkey",
             add constraint "network_user_relationship_from_user_uuid_fkey"
             foreign key ("from_user_uuid")
             references "public"."user"
             ("uuid") on update restrict on delete cascade;
