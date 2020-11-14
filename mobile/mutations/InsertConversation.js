const InsertConversation = `
  mutation InsertConversation(
      $network_uuid: uuid, 
      $user_data: [conversation_user_insert_input!]!
    ) {
    insert_conversation_one(
      object: {
        network_uuid: $network_uuid, 
        conversation_users: {
          data: $user_data
        }
      }
    ) {
      uuid
    }
  }
`;

export default InsertConversation;
