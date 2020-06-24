alter table "public"."network_users" drop constraint "network_users_network_uuid_fkey",
             add constraint "network_users_network_uuid_fkey"
             foreign key ("network_uuid")
             references "public"."network"
             ("uuid") on update restrict on delete cascade;
