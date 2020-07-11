const DeleteNetworkMembershipInvitation = `
  mutation DeleteNetworkMembershipInvitation($uuid: uuid) {
    delete_network_membership_invitation(where: {uuid: {_eq: $uuid}}) {
      affected_rows
      returning {
        __typename
        uuid
      }
    }
  }
`;

export default DeleteNetworkMembershipInvitation;
