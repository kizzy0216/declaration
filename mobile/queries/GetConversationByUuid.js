const GetConversationByUuid = `
  query GetConversationByUuid($uuid: uuid!) {
    conversation_by_pk(uuid: $uuid) {
      __typename
      uuid
      conversation_users {
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
