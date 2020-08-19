alter table "public"."content_partial_opportunity_listing_criteria"
           add constraint "content_partial_opportunity_listing_criteria_opportunity_lis"
           foreign key ("opportunity_listing_criteria_uuid")
           references "public"."opportunity_listing_criteria"
           ("uuid") on update restrict on delete restrict;
