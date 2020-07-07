const GetUser = `
  query GetUser($uuid: uuid!) {
    user_by_pk(uuid: $uuid) {
      __typename
      uuid
      name
      email
      created_at
      updated_at
    }
  }
`;

export default GetUser;
