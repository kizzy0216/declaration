const GetLoopByUuid = `
  query GetLoopByUuid($uuid: uuid!, $user_uuid: uuid!, $limit: Int) {
    loop_by_pk(uuid: $uuid) {
      __typename
      uuid
      name
      owner_uuid
      loop_users(where: {user_uuid: {_neq: $user_uuid}}) {
        user {
          uuid
          name
          user_profile {
            photo
          }
        }
      }
    }
  }
`;

export default GetLoopByUuid;
