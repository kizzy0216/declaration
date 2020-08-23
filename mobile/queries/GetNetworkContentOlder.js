import ContentFragment from '~/fragments/ContentFragment';

const GetNetworkContentOlder = `
  ${ContentFragment}
  query GetNetworkContentOlder(
    $network_uuid: uuid,
    $viewer_uuid: uuid,
    $limit: Int = 20,
    $created_at_before: timestamptz
  ) {
    content(
      limit: $limit,
      where: {
        network_uuid: {_eq: $network_uuid},
        created_at: {_lt: $created_at_before}
      },
      order_by: {created_at: desc}
    ) {
      ...ContentFragment
    }
  }
`;

export default GetNetworkContentOlder;
