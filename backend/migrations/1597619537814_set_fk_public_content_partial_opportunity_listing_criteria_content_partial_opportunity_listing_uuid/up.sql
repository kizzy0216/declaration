alter table "public"."content_partial_opportunity_listing_criteria"
           add constraint "content_partial_opportunity_listing_criteria_content_partial"
           foreign key ("content_partial_opportunity_listing_uuid")
           references "public"."content_partial_opportunity_listing"
           ("uuid") on update restrict on delete cascade;
