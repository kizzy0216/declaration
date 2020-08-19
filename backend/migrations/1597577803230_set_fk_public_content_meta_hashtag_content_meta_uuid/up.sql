alter table "public"."content_meta_hashtag"
           add constraint "content_meta_hashtag_content_meta_uuid_fkey"
           foreign key ("content_meta_uuid")
           references "public"."content_meta"
           ("uuid") on update restrict on delete cascade;
