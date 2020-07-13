const UpdateNetworkUserIsBlocked = `
  mutation UpdateNetworkUserIsBlocked(
    $network_uuid: uuid!,
    $user_uuid: uuid!,
    $is_blocked: Boolean
  ) {
    update_network_user_by_pk(
      pk_columns: {network_uuid: $network_uuid, user_uuid: $user_uuid},
      _set: {is_blocked: $is_blocked}
    ) {
      __typename
      user_uuid
      network_uuid
      role
      is_blocked
    }
  }
`;

export default UpdateNetworkUserIsBlocked;
