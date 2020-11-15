const GetLoopByUuid = `
  query GetLoopByUuid($uuid: uuid!, $user_uuid: uuid!, $limit: Int) {
    loop_by_pk(uuid: $uuid) {
      __typename
      uuid
      name
      owner_uuid
      loop_users(where: {user_uuid: {_neq: $user_uuid}}) {
        user {
          uuid
          name
          user_profile {
            photo
          }
        }
      }
      chat_messages(
        limit: $limit, 
        where: {is_archived: {_eq: false}},
        order_by: {created_at: asc},
      ) {
        text
        reaction
        created_at
        sender_uuid
        sender {
          name
          user_profile {
            photo
          }
        }
        media {
          uuid
          original_url
        }
      }
    }
  }
`;

export default GetLoopByUuid;
