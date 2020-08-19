alter table "public"."comment"
           add constraint "comment_parent_comment_uuid_fkey"
           foreign key ("parent_comment_uuid")
           references "public"."comment"
           ("uuid") on update restrict on delete restrict;
