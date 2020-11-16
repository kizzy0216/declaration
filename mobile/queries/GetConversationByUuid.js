const GetConversationByUuid = `
  query GetConversationByUuid($uuid: uuid!, $user_uuid: uuid!) {
    conversation_by_pk(uuid: $uuid) {
      __typename
      uuid
      conversation_users(where: {user_uuid: {_neq: $user_uuid}}) {
        last_read_at
        last_typed_at
        is_hidden
        created_at
        user {
          uuid
          name
          user_profile {
            photo
          }
        }
      }
    }
  }
`;

export default GetConversationByUuid;
