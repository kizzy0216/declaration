alter table "public"."content_partial_poll_option"
           add constraint "content_partial_poll_option_content_partial_poll_uuid_fkey"
           foreign key ("content_partial_poll_uuid")
           references "public"."content_partial_poll"
           ("uuid") on update restrict on delete cascade;
