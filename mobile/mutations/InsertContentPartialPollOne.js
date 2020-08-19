const InsertContentPartialPollOne = `
  mutation InsertContentPartialPollOne (
    $content_partial_poll_options: [content_partial_poll_option_insert_input!]!
  ) {
    insert_content_partial_poll_one(
      object: {
        content_partial: {
          data: {}
        },
        content_partial_poll_options: {
          data: $content_partial_poll_options
        }
      }
    ) {
      __typename
      content_partial {
        __typename
        uuid
      }
    }
  }
`;

export default InsertContentPartialPollOne;
