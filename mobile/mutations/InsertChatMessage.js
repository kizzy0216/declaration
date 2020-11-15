const InsertChatMessage = `
  mutation InsertChatMessage(
      $loop_uuid: uuid, 
      $conversation_uuid: uuid,
      $text: String,
      $media: media_obj_rel_insert_input
    ) {
    insert_chat_message_one(
      object: {
        loop_uuid: $loop_uuid, 
        conversation_uuid: $conversation_uuid, 
        text: $text
        media: $media, 
      }
    ) {
      uuid
    }
  }
`;

export default InsertChatMessage;
