const GetMessages = `
  query GetMessagesQuery($user_uuid: uuid) {
    message(
      where: {
        chat_user: {
          user_uuid: {_eq: $user_uuid}
        }
      }
    ) {
      __typename
      uuid
    }
  }
`;

export default GetMessages;
