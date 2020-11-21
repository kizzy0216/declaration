CREATE OR REPLACE VIEW "public"."conversation_user_typing_view" AS 
 SELECT conversation_user.conversation_uuid,
    conversation_user.user_uuid,
    conversation_user.last_typed_at
   FROM conversation_user
  WHERE (conversation_user.last_typed_at > (now() - '00:00:03'::interval));
