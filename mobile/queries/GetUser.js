const GetUser = `
  query GetUser($uuid: uuid!) {
    user_by_pk(uuid: $uuid) {
      __typename
      uuid
      id
      name
      email
      created_at
      updated_at
      network_users(
        order_by: {network: {name: asc}}
      ) {
        network {
          __typename
          uuid
          id
          name
        }
      }
    }
  }
`;

export default GetUser;
