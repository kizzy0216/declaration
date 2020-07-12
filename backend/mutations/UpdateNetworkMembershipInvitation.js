const UpdateNetworkMembershipInvitation = `
  mutation UpdateNetworkMembershipInvitation(
    $uuid: uuid, 
    $code: String,
    $redirect: String,
  ) {
    update_network_membership_invitation(
      where: {
        uuid: {_eq: $uuid}
      },
      _set: {
        code: $code,
        redirect: $redirect
      }
    ) {
      affected_rows
      returning {
        __typename
        uuid
        code
        redirect
      }
    }
  }
`

export default UpdateNetworkMembershipInvitation;
