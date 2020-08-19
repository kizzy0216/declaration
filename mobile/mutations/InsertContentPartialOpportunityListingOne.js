const InsertContentPartialOpportunityListingOne = `
  mutation InsertContentPartialOpportunityListingOne (
    $content_partial_opportunity_listing_criteria: [content_partial_opportunity_listing_criteria_insert_input!]!
  ) {
    insert_content_partial_opportunity_listing_one(
      object: {
        content_partial: {
          data: {}
        },
        content_partial_opportunity_listing_criteria: {
          data: $content_partial_opportunity_listing_criteria
        }
      }
    ) {
      __typename
      content_partial {
        __typename
        uuid
      }
    }
  }
`;

export default InsertContentPartialOpportunityListingOne;
