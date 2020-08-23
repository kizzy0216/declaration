import ContentFragment from '~/fragments/ContentFragment';

const GetNetworkContentNewer = `
  ${ContentFragment}
  query GetNetworkContentNewer(
    $network_uuid: uuid,
    $viewer_uuid: uuid,
    $limit: Int = 20,
    $created_at_after: timestamptz
  ) {
    content(
      limit: $limit,
      where: {
        network_uuid: {_eq: $network_uuid},
        created_at: {_gt: $created_at_after}
      },
      order_by: {created_at: desc}
    ) {
      ...ContentFragment
    }
  }
`;

export default GetNetworkContentNewer;
