const GetNetworkUsersByEmail = `
  query GetNetworkUsersByEmail($email: String) {
    network_user(where: {user: {email: {_eq: $email}}}) {
      user_uuid
      network_uuid
      role
    }
  }
`;

export default GetNetworkUsersByEmail;
