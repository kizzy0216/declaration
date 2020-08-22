alter table "public"."content_partial_poll_vote" drop constraint "content_partial_poll_vote_pkey";
alter table "public"."content_partial_poll_vote"
    add constraint "content_partial_poll_vote_pkey" 
    primary key ( "poll_option_uuid", "content_partial_poll_uuid" );
