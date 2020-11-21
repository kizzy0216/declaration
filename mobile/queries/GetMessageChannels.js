const GetMessageChannels = `
  query GetMessageChannels($network_uuid: uuid, $user_uuid: uuid) {
    loop(
      where: {
        network_uuid: {_eq: $network_uuid}, 
        loop_users: {user_uuid: {_eq: $user_uuid}},
        is_archived: {_eq: false}
      }
    ) {
        uuid
        name
        description
        is_private
        created_at
        owner_uuid
      }
    conversation(
      where: {
        network_uuid: {_eq: $network_uuid},
        conversation_users: {user_uuid: {_eq: $user_uuid}},
      }
    ) {
        uuid
        conversation_users(
          where: {
            user_uuid: {
              _neq: $user_uuid
            }
          }
        ) {
          user_uuid
          user {
            name
            user_profile {
              photo
            }
          }
        }
        chat_messages(order_by: {created_at: desc}, limit: 1) {
          text
          media_uuid
        }
      }
  }
`;

export default GetMessageChannels;
