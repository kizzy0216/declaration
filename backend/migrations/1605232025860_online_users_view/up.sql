create view "online_users_view" as
      select uuid from "user"
      where "last_seen_at" > now() - interval '10 seconds';
