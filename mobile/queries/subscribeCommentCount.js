
const subscribeCommentCount = `
  subscription SubscribeCommentCount($content_uuid: uuid) {
    content_comment(where: {content_uuid: {_eq: $content_uuid}}) {
      __typename
      comment_uuid
    }
  }
`;

export default subscribeCommentCount;
