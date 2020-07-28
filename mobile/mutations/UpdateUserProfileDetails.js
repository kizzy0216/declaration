const UpdateUserProfileDetails = `
  mutation UpdateUserProfileDetails(
    $user_uuid: uuid!,
    $user_profile_uuid: uuid!,
    $user_profile_private_uuid: uuid!,
    $name: String,
    $username: String,
    $personal_bio: String,
    $date_of_birth: date,
    $gender: String
  ) {
    update_user_by_pk(
      pk_columns: {uuid: $user_uuid},
      _set: {name: $name}
    ) {
      __typename
      uuid
      id
    }

    update_user_profile_by_pk(
      pk_columns: {uuid: $user_profile_uuid},
      _set: {username: $username, personal_bio: $personal_bio}
    ) {
      __typename
      uuid
      id
    }

    update_user_profile_private_by_pk(
      pk_columns: {uuid: $user_profile_private_uuid},
      _set: {gender: $gender, date_of_birth: $date_of_birth}
    ) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileDetails;
