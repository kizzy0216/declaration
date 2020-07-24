const UpdateUserProfileEducationalInstitution = `
  mutation UpdateUserProfileEducationalInstitution($uuid: uuid!, $educational_institution: String) {
    update_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {educational_institution: $educational_institution}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserProfileEducationalInstitution;
