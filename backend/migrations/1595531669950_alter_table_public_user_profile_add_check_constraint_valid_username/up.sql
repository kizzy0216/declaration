alter table "public"."user_profile" add constraint "valid_username" check (username similar to '[a-z0-9_-]{3,16}');
