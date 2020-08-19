alter table "public"."content_comment" add constraint "content_comment_content_uuid_comment_uuid_key" unique ("content_uuid", "comment_uuid");
