const GetNetworkAccessRequests = `
  query GetNetworkAccessRequests {
    network_access_request {
      __typename
      uuid
      id
      requester_name
      requester_email
      community_name
      body
      created_at
      user_count_range
      updated_at
    }
  }
`;

export default GetNetworkAccessRequests;
