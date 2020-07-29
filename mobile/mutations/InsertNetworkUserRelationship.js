const InsertNetworkUserRelationship = `
  mutation InsertNetworkUserRelationship(
    $from_user_uuid: uuid,
    $to_user_uuid: uuid,
    $network_uuid: uuid,
    $type: network_user_relationship_type_enum
  ) {
    insert_network_user_relationship_one(
      object: {
        from_user_uuid: $from_user_uuid,
        to_user_uuid: $to_user_uuid,
        network_uuid: $network_uuid,
        type: $type
      }
    ) {
      __typename
      uuid
      id
      from_user_uuid
      to_user_uuid
      type
      created_at
      updated_at
    }
  }
`;

export default InsertNetworkUserRelationship;
