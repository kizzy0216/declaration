const UpdateNetworkUserRelationship = `
  mutation UpdateNetworkUserRelationship(
    $uuid: uuid!,
    $type: network_user_relationship_type_enum
  ) {
    update_network_user_relationship_by_pk(
      pk_columns: {uuid: $uuid},
      _set: {type: $type}
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

export default UpdateNetworkUserRelationship;
