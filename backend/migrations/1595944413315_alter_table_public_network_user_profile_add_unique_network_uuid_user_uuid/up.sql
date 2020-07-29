alter table "public"."network_user_profile" add constraint "network_user_profile_network_uuid_user_uuid_key" unique ("network_uuid", "user_uuid");
