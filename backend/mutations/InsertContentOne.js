const InsertContentOne = `
  mutation InsertContentOne(
    $network_uuid: uuid,
    $creator_uuid: uuid,
    $heading: String,
    $sub_heading: String,
    $body: String,
    $description: String,
    $content_meta_mentions: [content_meta_mention_insert_input!]!,
    $media: media_obj_rel_insert_input
  ) {
    insert_content_one(
      object: {
        network_uuid: $network_uuid,
        creator_uuid: $creator_uuid,
        heading: $heading,
        sub_heading: $sub_heading,
        body: $body,
        content_meta: {
          data: {
            description: $description,
            content_meta_mentions: {
              data: $content_meta_mentions
            }
          }
        },
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
