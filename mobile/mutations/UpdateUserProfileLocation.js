const UpdateUserProfileLocation = `
  mutation UpdateUserProfileLocation($uuid: uuid!, $location: String, $location_latitude_longitude: point) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {location: $location, location_latitude_longitude: $location_latitude_longitude}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileLocation;
