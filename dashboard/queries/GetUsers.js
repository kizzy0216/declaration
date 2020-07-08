const GetUsers = `
  query GetUsers {
    user {
      __typename
      uuid
      id
      name
      email
      updated_at
      created_at
      user_profile {
        __typename
        photo
        location
      }
      network_users {
        network {
          __typename
          uuid
          id
          name
        }
        role
      }
    }
  }
`;

export default GetUsers;
