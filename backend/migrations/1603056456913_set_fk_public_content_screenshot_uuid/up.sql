alter table "public"."content"
           add constraint "content_screenshot_uuid_fkey"
           foreign key ("screenshot_uuid")
           references "public"."media"
           ("uuid") on update set null on delete set null;
