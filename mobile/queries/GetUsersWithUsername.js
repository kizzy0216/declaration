const GetUsersWithUsername = `
  query GetUserWithUsername($username: String) {
    user_profile(where: {username: {_eq: $username}}, limit: 1) {
      __typename
      uuid
    }
  }
`;

export default GetUsersWithUsername;
