alter table "public"."content_partial_opportunity_listing" drop constraint "content_partial_opportunity_listing_uuid_fkey",
             add constraint "content_partial_opportunity_listing_call_to_action_uuid_fkey"
             foreign key ("call_to_action_uuid")
             references "public"."call_to_action"
             ("uuid") on update restrict on delete cascade;
