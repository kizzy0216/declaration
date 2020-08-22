CREATE VIEW content_partial_poll_vote_count AS
SELECT content_partial_poll_uuid, poll_option_uuid, count(*)
FROM content_partial_poll_vote
GROUP BY content_partial_poll_uuid, poll_option_uuid;
