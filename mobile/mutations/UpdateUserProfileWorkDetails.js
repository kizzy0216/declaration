const UpdateUserProfileWorkDetails = `
  mutation UpdateUserProfileWorkDetails(
    $uuid: uuid!,
    $work_place: String,
    $work_title: String
  ) {
    update_user_profile_by_pk(
      pk_columns: {uuid: $uuid},
      _set: {work_place: $work_place, work_title: $work_title}
    ) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileWorkDetails;
