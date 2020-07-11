const GetNetworksWhereNotMember = `
  query GetNetworksWhereNotMember($user_uuid: uuid) {
    network(where: {network_users: {user_uuid: {_neq: $user_uuid}}}) {
      __typename
      uuid
      id
      name
      updated_at
      created_at
    }
  }
`;

export default GetNetworksWhereNotMember;
