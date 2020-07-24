const UpdateUserProfilePhoto = `
  mutation UpdateUserProfilePhoto($uuid: uuid!, $photo: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {photo: $photo}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfilePhoto;
