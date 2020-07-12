const GetNetworkMembershipInvitations = `
  query GetNetworkMembershipInvitations($email: String, $code: String) {
    network_membership_invitation(
      where: {
        user_email: {_eq: $email},
        code: {_eq: $code}
      }
    ) {
      __typename
      uuid
      id
      user_name
      user_email
      code
      network_uuid
      created_at
      updated_at
    }
  }
`;

export default GetNetworkMembershipInvitations;
