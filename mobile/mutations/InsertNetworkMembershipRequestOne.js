const InsertNetworkMembershipRequestOne = `
  mutation InsertNetworkMembershipRequestOne(
    $user_uuid: uuid,
    $network_uuid: uuid,
    $body: String = ""
  ) {
    insert_network_membership_request_one(
      object: {
        user_uuid: $user_uuid,
        network_uuid: $network_uuid,
        body: $body
      }
    ) {
      __typename
      uuid
    }
  }
`;

export default InsertNetworkMembershipRequestOne;
