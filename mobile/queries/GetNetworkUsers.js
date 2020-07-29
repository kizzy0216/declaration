const GetNetworkUsers = `
  query GetNetworkUsers($network_uuid: uuid, $not_user_uuid: uuid) {
    network_user(
      where: {network_uuid: {_eq: $network_uuid}, user_uuid: {_neq: $not_user_uuid}},
      order_by: {user: {name: asc}}
    ) {
      __typename
      user {
        __typename
        name
        uuid
        user_profile {
          __typename
          photo
        }
      }
    }
  }
`;

export default GetNetworkUsers;
