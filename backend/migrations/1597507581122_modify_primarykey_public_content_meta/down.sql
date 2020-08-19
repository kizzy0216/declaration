alter table "public"."content_meta" drop constraint "content_meta_pkey";
alter table "public"."content_meta"
    add constraint "content_meta_pkey" 
    primary key ( "content_uuid" );
