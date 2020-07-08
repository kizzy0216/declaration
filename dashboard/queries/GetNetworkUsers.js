const GetNetworkUsers = `
  query GetNetworkUsers($network_id: bigint) {
    network_user(where: {network: {id: {_eq: $network_id}}}) {
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
    }
  }
`;

export default GetNetworkUsers;
