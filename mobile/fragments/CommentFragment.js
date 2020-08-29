const CommentFragment = `
  fragment CommentFragment on comment {
    __typename
    uuid
    id
    text
    creator {
      __typename
      uuid
      id
      name
      user_profile {
        __typename
        photo
      }
    }
    parent_comment_uuid
    parent {
      __typename
      uuid
      id
      text
      created_at
      updated_at
    }
    children(limit: 1, order_by: {created_at: asc}) {
      __typename
      uuid
      id
      text
      creator {
        __typename
        uuid
        id
        name
        user_profile {
          __typename
          photo
        }
      }
      children_aggregate {
        aggregate {
          count
        }
      }
      comment_ancestors {
        __typename
        ancestor_uuid
        ancestor {
          __typename
          uuid
          id
          text
          creator {
            __typename
            uuid
            id
            name
            user_profile {
              __typename
              photo
            }
          }
          created_at
          updated_at
        }
      }
      created_at
      updated_at
    }
    children_aggregate {
      aggregate {
        count
      }
    }
    comment_ancestors {
      __typename
      ancestor_uuid
      ancestor {
        __typename
        uuid
        id
        text
        creator {
          __typename
          uuid
          id
          name
          user_profile {
            __typename
            photo
          }
        }
        created_at
        updated_at
      }
    }
    created_at
    updated_at
  }
`;

export default CommentFragment;
