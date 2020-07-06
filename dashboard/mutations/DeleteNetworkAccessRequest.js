const DeleteNetworkAccessRequest = `
  mutation DeleteNetworkAccessRequest($uuid: uuid) {
    delete_network_access_request(where: {uuid: {_eq: $uuid}}) {
      affected_rows
      returning {
        __typename
        uuid
      }
    }
  }
`;

export default DeleteNetworkAccessRequest;
