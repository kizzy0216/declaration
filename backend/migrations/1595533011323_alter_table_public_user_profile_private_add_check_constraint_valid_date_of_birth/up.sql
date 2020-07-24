alter table "public"."user_profile_private" add constraint "valid_date_of_birth" check ((age(date_of_birth) >= interval '16' year));
