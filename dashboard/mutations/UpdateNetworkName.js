const UpdateNetworkName = `
  mutation UpdateNetworkName($uuid: uuid!, $name: String) {
    update_network_by_pk(pk_columns: {uuid: $uuid}, _set: {name: $name}) {
      __typename
      uuid
    }
  }
`;

export default UpdateNetworkName;
