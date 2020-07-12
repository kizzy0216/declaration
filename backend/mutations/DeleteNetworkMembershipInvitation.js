const DeleteNetworkMembershipInvitation = `
  mutation DeleteNetworkMembershipInvitation($uuid: uuid!) {
    delete_network_membership_invitation_by_pk(uuid: $uuid) {
      __typename
      uuid
      id
      user_email
      user_name
      code
      redirect
    }
  }
`;

export default DeleteNetworkMembershipInvitation;
