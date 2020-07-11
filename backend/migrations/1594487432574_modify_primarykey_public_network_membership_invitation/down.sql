alter table "public"."network_membership_invitation" drop constraint "network_membership_invitation_pkey";
alter table "public"."network_membership_invitation"
    add constraint "network_membership_invitation_pkey" 
    primary key ( "id" );
