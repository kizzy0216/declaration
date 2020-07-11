const GetNetworkMembershipRequests = `
  query GetNetworkMembershipRequests($network_id: bigint) {
    network_membership_request(where: {network: {id: {_eq: $network_id}}}) {
      __typename
      uuid
      id
      body
      created_at
      updated_at
      user {
        __typename
        uuid
        id
        name
        email
      }
    }
  }
`;

export default GetNetworkMembershipRequests;
