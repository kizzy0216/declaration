const InsertContentPollVote = `
  mutation InsertContentPollVote($content_partial_poll_uuid: uuid, $poll_option_uuid: uuid) {
    insert_content_partial_poll_vote_one(
      object: {
        poll_option_uuid: $poll_option_uuid,
        content_partial_poll_uuid: $content_partial_poll_uuid
      }
    ) {
      __typename
      poll_option_uuid
    }
  }
`;

export default InsertContentPollVote;
