alter table "public"."content_partial"
           add constraint "content_partial_content_uuid_fkey"
           foreign key ("content_uuid")
           references "public"."content"
           ("uuid") on update restrict on delete cascade;
