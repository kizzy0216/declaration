const InsertContentOne = `
  mutation InsertContentOne(
    $creator_uuid: uuid,
    $network_uuid: uuid,
    $heading: String,
    $description: String,
    $content_meta_mentions: [content_meta_mention_insert_input!]!,
    $content_partial_uuid: uuid,
    $media: media_obj_rel_insert_input
  ) {
    insert_content_one(
      object: {
        creator_uuid: $creator_uuid,
        network_uuid: $network_uuid,
        heading: $heading,
        content_meta: {
          data: {
            description: $description,
            content_meta_mentions: {
              data: $content_meta_mentions
            }
          }
        },
        content_partial_uuid: $content_partial_uuid,
        media: $media
      }
    ) {
      __typename
      uuid
      id
    }
  }
`;

export default InsertContentOne;
