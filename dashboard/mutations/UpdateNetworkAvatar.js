const UpdateNetworkAvatar = `
  mutation UpdateNetworkAvatar($uuid: uuid!, $avatar: String) {
    update_network_by_pk(pk_columns: {uuid: $uuid}, _set: {avatar: $avatar}) {
      __typename
      uuid
    }
  }
`;

export default UpdateNetworkAvatar;
