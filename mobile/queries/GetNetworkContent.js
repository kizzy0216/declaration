import ContentFragment from '~/fragments/ContentFragment';

const GetNetworkContent = `
  ${ContentFragment}
  query GetNetworkContent(
    $network_uuid: uuid,
    $viewer_uuid: uuid,
    $limit: Int = 20
  ) {
    content(
      limit: $limit,
      where: {
        network_uuid: {_eq: $network_uuid}
      },
      order_by: {created_at: desc}
    ) {
      ...ContentFragment
    }
  }
`;

export default GetNetworkContent;
