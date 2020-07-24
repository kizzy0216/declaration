const UpdateUserProfilePrivateGender = `
  mutation UpdateUserProfilePrivateGender($uuid: uuid!, $gender: String) {
    update_user_profile_private_by_pk(pk_columns: {uuid: $uuid}, _set: {gender: $gender}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfilePrivateGender;
