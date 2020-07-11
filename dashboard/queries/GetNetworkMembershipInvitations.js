const GetNetworkMembershipInvitations = `
  query GetNetworkMembershipInvitations($network_id: bigint) {
    network_membership_invitation(where: {network: {id: {_eq: $network_id}}}) {
      __typename
      uuid
      id
      user_name
      user_email
      created_at
      updated_at
    }
  }
`;

export default GetNetworkMembershipInvitations;
