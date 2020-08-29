alter table "public"."content_partial_opportunity_listing"
           add constraint "content_partial_opportunity_listing_company_uuid_fkey"
           foreign key ("company_uuid")
           references "public"."company"
           ("uuid") on update restrict on delete restrict;
