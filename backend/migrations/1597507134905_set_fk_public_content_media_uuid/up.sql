alter table "public"."content"
           add constraint "content_media_uuid_fkey"
           foreign key ("media_uuid")
           references "public"."media"
           ("uuid") on update restrict on delete restrict;
