CREATE OR REPLACE VIEW "public"."online_users_view" AS 
 SELECT "user".uuid
   FROM "user"
  WHERE ("user".last_seen_at > (now() - '00:03:00'::interval));
