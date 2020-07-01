import NetworkAccessRequestFragment from '~/fragments/NetworkAccessRequestFragment';

const InsertNetworkAccessRequest = `
  ${NetworkAccessRequestFragment}
  mutation InsertNetworkAccessRequest(
    $requester_name: String = "",
    $requester_email: String = "",
    $user_count_range: int4range = "",
    $community_name: String = "",
    $body: String = ""
  ) {
    insert_network_access_request_one(
      object: {
        requester_name: $requester_name,
        requester_email: $requester_email,
        user_count_range: $user_count_range,
        community_name: $community_name,
        body: $body
      }
    ) {
      ...NetworkAccessRequestFragment
    }
  }
`;

export default InsertNetworkAccessRequest;
