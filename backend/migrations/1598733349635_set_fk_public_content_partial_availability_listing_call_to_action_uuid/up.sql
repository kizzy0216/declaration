alter table "public"."content_partial_availability_listing"
           add constraint "content_partial_availability_listing_call_to_action_uuid_fke"
           foreign key ("call_to_action_uuid")
           references "public"."call_to_action"
           ("uuid") on update restrict on delete cascade;
