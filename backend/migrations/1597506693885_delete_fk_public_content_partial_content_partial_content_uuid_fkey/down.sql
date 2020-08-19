alter table "public"."content_partial" add foreign key ("content_uuid") references "public"."content"("uuid") on update restrict on delete cascade;
