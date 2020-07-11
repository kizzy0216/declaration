const DeleteNetworkMembershipRequest = `
  mutation DeleteNetworkMembershipRequest($uuid: uuid) {
    delete_network_membership_request(where: {uuid: {_eq: $uuid}}) {
      affected_rows
      returning {
        __typename
        uuid
      }
    }
  }
`;

export default DeleteNetworkMembershipRequest;
