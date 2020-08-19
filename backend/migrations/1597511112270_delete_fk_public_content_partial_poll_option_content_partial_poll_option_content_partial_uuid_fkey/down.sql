alter table "public"."content_partial_poll_option" add foreign key ("content_partial_uuid") references "public"."content_partial"("uuid") on update restrict on delete cascade;
