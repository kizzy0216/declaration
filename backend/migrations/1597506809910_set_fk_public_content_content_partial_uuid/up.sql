alter table "public"."content"
           add constraint "content_content_partial_uuid_fkey"
           foreign key ("content_partial_uuid")
           references "public"."content_partial"
           ("uuid") on update restrict on delete cascade deferrable initially deferred;
