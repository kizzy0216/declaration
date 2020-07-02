const NetworkAccessRequestFragment = `
  fragment NetworkAccessRequestFragment on network_access_request {
    __typename
    uuid
    id
    created_at
    updated_at
    requester_name
    requester_email
    community_name
    user_count_range
    body
  }
`;

export default NetworkAccessRequestFragment;
