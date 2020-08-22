const GetContentPartialPoll = `
  query GetContentPartialPoll($uuid: uuid!) {
    content_partial_poll_by_pk(uuid: $uuid) {
      __typename
      uuid
      content_partial_poll_options {
        __typename
        poll_option {
          __typename
          uuid
          text
        }
      }
      content_partial_poll_vote_counts {
        __typename
        poll_option {
          __typename
          uuid
          text
        }
        count
      }
    }
  }
`;

export default GetContentPartialPoll;
