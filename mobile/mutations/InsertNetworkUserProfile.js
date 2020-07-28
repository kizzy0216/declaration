const InsertNetworkUserProfile = `
  mutation InsertNetworkUserProfile($user_uuid: uuid, $network_uuid: uuid) {
    insert_network_user_profile_one(object: {user_uuid: $user_uuid, network_uuid: $network_uuid}) {
      __typename
      uuid
      id
    }
  }
`;

export default InsertNetworkUserProfile;
