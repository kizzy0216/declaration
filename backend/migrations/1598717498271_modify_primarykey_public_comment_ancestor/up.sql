alter table "public"."comment_ancestor" drop constraint "comment_ancestor_pkey";
alter table "public"."comment_ancestor"
    add constraint "comment_ancestor_pkey" 
    primary key ( "comment_uuid", "ancestor_uuid" );
