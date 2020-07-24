const UpdateUserProfileLocation = `
  mutation UpdateUserProfileLocation($uuid: uuid!, $location: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {location: $location}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileLocation;
