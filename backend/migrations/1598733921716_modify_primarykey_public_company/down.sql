alter table "public"."company" drop constraint "company_pkey";
alter table "public"."company"
    add constraint "company_pkey" 
    primary key ( "id" );
