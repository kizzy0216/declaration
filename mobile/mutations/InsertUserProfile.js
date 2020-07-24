const InsertUserProfile = `
  mutation InsertUserProfile($user_uuid: uuid) {
    insert_user_profile_one(object: {user_uuid: $user_uuid}) {
      __typename
      uuid
      id
    }
  }
`;

export default InsertUserProfile;
