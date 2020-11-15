const UpdateNetwork = `
  mutation UpdateNetwork($uuid: uuid!, $avatar: String, $name: String) {
    update_network_by_pk(pk_columns: {uuid: $uuid}, _set: {avatar: $avatar, name: $name}) {
      __typename
      uuid
    }
  }
`;

export default UpdateNetwork;
