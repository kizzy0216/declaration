const GetNetworkById = `
  query GetNetworkById($id: bigint) {
    network(where: {id: {_eq: $id}}) {
      __typename
      uuid
      id
      name
      avatar
      updated_at
      created_at
    }
  }
`;

export default GetNetworkById;
