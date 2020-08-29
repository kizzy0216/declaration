const InsertContentComment = `
  mutation InsertContentComment(
    $content_uuid: uuid,
    $text: String = "",
    $parent_comment_uuid: uuid,
    $ancestors: [comment_ancestor_insert_input!]!
  ) {
    insert_content_comment_one(
      object: {
        content_uuid: $content_uuid,
        comment: {
          data: {
            text: $text,
            parent_comment_uuid: $parent_comment_uuid,
            comment_ancestors: {
              data: $ancestors
            }
          }
        }
      }
    ) {
      __typename
      comment_uuid
      content_uuid
    }
  }
`;

export default InsertContentComment;
