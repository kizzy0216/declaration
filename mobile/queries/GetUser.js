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
      user_profile {
        __typename
        uuid
        id
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
      network_user_profiles {
        __typename
        uuid
        id
        problem_bio
        solution_bio
        network {
          __typename
          uuid
          id
          name
          avatar
        }
        created_at
        updated_at
      }
      network_users(
        order_by: {network: {name: asc}}
      ) {
        __typename
        role
        is_blocked
        network {
          __typename
          uuid
          id
          name
          avatar
        }
      }
    }
  }
`;

export default GetUser;
