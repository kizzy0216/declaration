const UpdateUserProfilePersonalBio = `
  mutation UpdateUserProfilePersonalBio($uuid: uuid!, $personal_bio: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {personal_bio: $personal_bio}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfilePersonalBio;
