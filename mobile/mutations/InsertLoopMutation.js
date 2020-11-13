const InsertLoopMutation = `
  mutation InsertLoopMutation(
      $name: String, 
      $network_uuid: uuid, 
      $user_uuids: [loop_user_insert_input!]!,
      $is_private: Boolean = false,
    ) {
    insert_loop_one(
      object: {
        is_private: $is_private, 
        name: $name, 
        slug: $name, 
        network_uuid: $network_uuid, 
        loop_users: {
          data: $user_uuids
        }
      }
    ) {
      uuid
    }
  }
`;

export default InsertLoopMutation;
