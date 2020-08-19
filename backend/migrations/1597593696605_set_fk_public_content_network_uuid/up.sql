alter table "public"."content" drop constraint "content_uuid_fkey",
             add constraint "content_network_uuid_fkey"
             foreign key ("network_uuid")
             references "public"."network"
             ("uuid") on update restrict on delete cascade;
