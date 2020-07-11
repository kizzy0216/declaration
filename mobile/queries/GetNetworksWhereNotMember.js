const GetNetworksWhereNotMember = `
  query GetNetworksWhereNotMember($user_uuid: uuid) {
    network(where: {_not: {network_users: {user_uuid: {_eq: $user_uuid}}}}) {
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
