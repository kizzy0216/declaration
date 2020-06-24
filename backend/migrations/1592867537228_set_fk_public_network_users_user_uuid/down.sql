alter table "public"."network_users" drop constraint "network_users_user_uuid_fkey",
          add constraint "network_users_user_uuid_fkey"
          foreign key ("user_uuid")
          references "public"."user"
          ("uuid")
          on update restrict
          on delete restrict;
