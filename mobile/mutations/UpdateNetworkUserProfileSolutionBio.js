const UpdateNetworkUserProfileSolutionBio = `
  mutation UpdateNetworkUserProfileSolutionBio($uuid: uuid!, $solution_bio: String) {
    update_network_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {solution_bio: $solution_bio}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateNetworkUserProfileSolutionBio;
