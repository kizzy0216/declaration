const GetMessageChannelsQuery = `
  query GetMessageChannelsQuery($user_uuid: uuid) {
    loop(
      where: {
        loop_user: {
          user_uuid: {_eq: $user_uuid}
        }
      }
    ) {
      __typename
      uuid
    }
  }
`;

export default GetMessageChannelsQuery;
