const UpdateNetworkUserProfileProblemBio = `
  mutation UpdateNetworkUserProfileProblemBio($uuid: uuid!, $problem_bio: String) {
    update_network_user_profile_by_pk(pk_columns: {uuid: $uuid}, _set: {problem_bio: $problem_bio}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateNetworkUserProfileProblemBio;
