const InsertContentPartialAvailabilityListingOne = `
  mutation InsertContentPartialAvailabilityListingOne (
    $content_partial_availability_listing_credentials: [content_partial_availability_listing_credential_insert_input!]!
  ) {
    insert_content_partial_availability_listing_one(
      object: {
        content_partial: {
          data: {}
        },
        content_partial_availability_listing_credentials: {
          data: $content_partial_availability_listing_credentials
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

export default InsertContentPartialAvailabilityListingOne;
