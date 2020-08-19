alter table "public"."content"
           add constraint "content_meta_uuid_fkey"
           foreign key ("meta_uuid")
           references "public"."content_meta"
           ("uuid") on update restrict on delete cascade;
