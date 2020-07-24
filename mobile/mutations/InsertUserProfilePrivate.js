const InsertUserProfilePrivate = `
  mutation InsertUserProfilePrivate($user_profile_uuid: uuid) {
    insert_user_profile_private_one(object: {user_profile_uuid: $user_profile_uuid}) {
      __typename
      uuid
      id
    }
  }
`;

export default InsertUserProfilePrivate;
