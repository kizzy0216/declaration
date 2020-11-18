const SubscribeChatMessages = `
subscription SubscribeChatMessages($loop_uuid: uuid, $conversation_uuid: uuid) {
  chat_message(
    where: {
      loop_uuid: {_eq: $loop_uuid},
      conversation_uuid: {_eq: $conversation_uuid},
      is_archived: {_eq: false}
    },
    order_by: {created_at: asc}
  ) {
    created_at
    uuid
    text
    sender {
      uuid
      name
      user_profile {
        photo
      }
    }
    media {
      original_url
      type
      uuid
    }
  }
}
`;

export default SubscribeChatMessages;
