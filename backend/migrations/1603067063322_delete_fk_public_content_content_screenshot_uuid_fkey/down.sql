alter table "public"."content" add foreign key ("screenshot_uuid") references "public"."media"("uuid") on update set null on delete set null;
