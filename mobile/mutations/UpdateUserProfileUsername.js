const UpdateUserProfileUsername = `
  mutation UpdateUserProfileUsername($uuid: uuid!, $username: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {username: $username}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileUsername;
