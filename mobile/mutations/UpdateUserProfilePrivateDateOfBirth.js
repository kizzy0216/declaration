const UpdateUserProfilePrivateDateOfBirth = `
  mutation UpdateUserProfilePrivateDateOfBirth($uuid: uuid!, $date_of_birth: date) {
    update_user_profile_private_by_pk(pk_columns: {uuid: $uuid}, _set: {date_of_birth: $date_of_birth}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfilePrivateDateOfBirth;
