const InsertNetworkMembershipInvitation = `
  mutation InsertNetworkMembershipInvitation(
    $network_uuid: uuid,
    $user_email: String,
    $user_name: String,
    $redirect: String
  ) {
    insert_network_membership_invitation_one(
      object: {
        network_uuid: $network_uuid,
        user_email: $user_email,
        user_name: $user_name,
        redirect: $redirect
      }
    ) {
      __typename
      network_uuid
      user_email
      user_name
      created_at
      updated_at
    }
  }
`;

export default InsertNetworkMembershipInvitation;
