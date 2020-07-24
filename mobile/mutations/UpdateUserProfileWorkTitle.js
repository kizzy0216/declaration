const UpdateUserProfileWorkTitle = `
  mutation UpdateUserProfileWorkTitle($uuid: uuid!, $work_title: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {work_title: $work_title}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileWorkTitle;
