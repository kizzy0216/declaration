alter table "public"."user_profile" drop constraint "user_profile_user_uuid_fkey",
          add constraint "user_profile_uuid_fkey"
          foreign key ("uuid")
          references "public"."user"
          ("uuid")
          on update restrict
          on delete cascade;
