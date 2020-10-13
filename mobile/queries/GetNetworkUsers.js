const GetNetworkUsers = `
  query GetNetworkUsers($network_uuid: uuid, $not_user_uuid: uuid) {
    network_user(
      where: {network_uuid: {_eq: $network_uuid}, user_uuid: {_neq: $not_user_uuid}},
      order_by: {user: {name: asc}}
    ) {
      __typename
      user {
        __typename
        uuid
        id
        name
        email
        created_at
        updated_at
        user_profile {
          __typename
          photo
          username
          location
          personal_bio
          work_place
          work_title
          work_bio
          educational_institution
          photo
          created_at
          updated_at
          user_profile_private {
            __typename
            uuid
            id
            date_of_birth
            gender
            created_at
            updated_at
          }
        }
      }
    }
  }
`;

export default GetNetworkUsers;
