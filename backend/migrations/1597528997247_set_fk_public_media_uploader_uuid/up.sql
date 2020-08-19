alter table "public"."media"
           add constraint "media_uploader_uuid_fkey"
           foreign key ("uploader_uuid")
           references "public"."user"
           ("uuid") on update restrict on delete cascade;
