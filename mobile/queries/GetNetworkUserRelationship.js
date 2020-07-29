const GetNetworkUserRelationship = `
  query GetNetworkUserRelationship(
    $network_uuid: uuid!,
    $authenticated_user_uuid: uuid,
    $user_uuid: uuid!,
    $type: network_user_relationship_type_enum
  ) {
    network_user_by_pk(network_uuid: $network_uuid, user_uuid: $user_uuid) {
      __typename
      user {
        __typename
        from_network_user_relationships(
          where: {
            to_user_uuid: {_eq: $authenticated_user_uuid},
            type: {_eq: $type}
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
        to_network_user_relationships(
          where: {
            from_user_uuid: {_eq: $authenticated_user_uuid},
            type: {_eq: $type}
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
    }
  }
`;

export default GetNetworkUserRelationship;
