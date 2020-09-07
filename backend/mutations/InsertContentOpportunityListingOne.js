const InsertContentOpportunityListingOne = `
  mutation InsertContentOpportunityListingOne (
    $network_uuid: uuid,
    $creator_uuid: uuid,
    $heading: String,
    $sub_heading: String,
    $body: String,
    $description: String,
    $content_meta_mentions: [content_meta_mention_insert_input!]!,
    $media: media_obj_rel_insert_input,
    $content_partial_opportunity_listing_criteria: [content_partial_opportunity_listing_criteria_insert_input!]!,
    $company: company_insert_input!,
    $call_to_action: call_to_action_insert_input!
  ) {
    insert_content_partial_opportunity_listing_one(
      object: {
        content_partial: {
          data: {
            content: {
              data: {
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
            }
          }
        },
        content_partial_opportunity_listing_criteria: {
          data: $content_partial_opportunity_listing_criteria
        },
        company: {
          data: $company
        },
        call_to_action: {
          data: $call_to_action
        }
      }
    ) {
      __typename
      content_partial {
        __typename
        uuid
        content {
          __typename
          uuid
        }
      }
    }
  }
`;

export default InsertContentOpportunityListingOne;