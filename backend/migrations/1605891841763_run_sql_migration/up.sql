CREATE OR REPLACE VIEW "public"."loop_user_typing_view" AS 
 SELECT loop_user.loop_uuid,
    loop_user.user_uuid,
    loop_user.last_typed_at
   FROM loop_user
  WHERE (loop_user.last_typed_at > (now() - '00:00:03'::interval));
