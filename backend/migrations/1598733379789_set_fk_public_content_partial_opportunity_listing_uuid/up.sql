alter table "public"."content_partial_opportunity_listing"
           add constraint "content_partial_opportunity_listing_uuid_fkey"
           foreign key ("uuid")
           references "public"."call_to_action"
           ("uuid") on update restrict on delete cascade;
