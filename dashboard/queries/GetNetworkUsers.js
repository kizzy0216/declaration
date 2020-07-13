const GetNetworkUsers = `
  query GetNetworkUsers($network_id: bigint) {
    network_user(where: {network: {id: {_eq: $network_id}}}) {
      __typename
      network_uuid
      user_uuid
      user {
        uuid
        id
        name
        email
        updated_at
        created_at
        user_profile {
          location
          photo
        }
      }
      role
      is_blocked
      created_at
      updated_at
    }
  }
`;

export default GetNetworkUsers;
