const GetMessageChannelsQuery = `
  query GetMessageChannelsQuery($network_uuid: uuid, $user_uuid: uuid) {
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
        network_uuid: {_eq: $network_uuid}
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
        }
      }
  }
`;

export default GetMessageChannelsQuery;
