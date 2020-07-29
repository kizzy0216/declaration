const UpdateNetworkUserRole = `
  mutation UpdateNetworkUserRole(
    $network_uuid: uuid!,
    $user_uuid: uuid!,
    $role: user_role_enum
  ) {
    update_network_user_by_pk(
      pk_columns: {network_uuid: $network_uuid, user_uuid: $user_uuid},
      _set: {role: $role}
    ) {
      __typename
      user_uuid
      network_uuid
      role
      is_blocked
    }
  }
`;

export default UpdateNetworkUserRole;
