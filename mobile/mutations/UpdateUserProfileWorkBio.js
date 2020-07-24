const UpdateUserProfileWorkBio = `
  mutation UpdateUserProfileWorkBio($uuid: uuid!, $work_bio: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {work_bio: $work_bio}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileWorkBio;
