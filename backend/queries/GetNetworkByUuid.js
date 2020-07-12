const GetNetworkByUuid = `
  query GetNetworkByUuid($uuid: uuid!) {
    network_by_pk(uuid: $uuid) {
      __typename
      uuid
      id
      name
      updated_at
      created_at
    }
  }
`;

export default GetNetworkByUuid;
