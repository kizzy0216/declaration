import CommentFragment from '~/fragments/CommentFragment';

const GetContentComments = `
  ${CommentFragment}
  query GetContentComments(
    $content_uuid: uuid,
    $parent_comment_uuid: uuid,
    $parent_comment_is_null: Boolean = false
  ) {
    content_comment(
      where: {
        content_uuid: {_eq: $content_uuid},
        comment: {
          parent_comment_uuid: {_eq: $parent_comment_uuid, _is_null: $parent_comment_is_null}
        }
      },
      order_by: {comment: {created_at: desc}}
    ) {
      __typename
      comment {
        ...CommentFragment
      }
    }
  }
`;

export default GetContentComments;
