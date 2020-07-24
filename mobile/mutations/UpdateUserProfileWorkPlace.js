const UpdateUserProfileWorkPlace = `
  mutation UpdateUserProfileWorkPlace($uuid: uuid!, $work_place: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {work_place: $work_place}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileWorkPlace;
