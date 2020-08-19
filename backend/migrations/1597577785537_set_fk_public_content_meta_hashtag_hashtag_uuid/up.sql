alter table "public"."content_meta_hashtag"
           add constraint "content_meta_hashtag_hashtag_uuid_fkey"
           foreign key ("hashtag_uuid")
           references "public"."hashtag"
           ("uuid") on update restrict on delete restrict;
