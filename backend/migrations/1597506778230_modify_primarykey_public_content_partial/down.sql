alter table "public"."content_partial" drop constraint "content_partial_pkey";
alter table "public"."content_partial"
    add constraint "content_partial_pkey" 
    primary key ( "content_uuid" );
