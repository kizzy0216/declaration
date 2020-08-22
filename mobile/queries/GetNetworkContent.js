const GetNetworkContent = `
  query GetNetworkContent($network_uuid: uuid, $viewer_uuid: uuid) {
    content(where: {network_uuid: {_eq: $network_uuid}}, order_by: {created_at: desc}) {
      __typename
      uuid
      id
      heading
      sub_heading
      body
      content_partial {
        __typename
        content_partial_opportunity_listing {
          __typename
          uuid
          content_partial_opportunity_listing_criteria {
            __typename
            opportunity_listing_criteria {
              __typename
              uuid
              text
            }
          }
        }
        content_partial_availability_listing {
          __typename
          uuid
          content_partial_availability_listing_credentials {
            __typename
            availability_listing_credential {
              __typename
              uuid
              text
            }
          }
        }
        content_partial_poll {
          __typename
          uuid
          content_partial_poll_options {
            __typename
            poll_option {
              __typename
              uuid
              text
            }
          }
          content_partial_poll_votes(
            where: {voter_uuid: {_eq: $viewer_uuid}}
          ) {
            __typename
            poll_option {
              __typename
              uuid
              text
            }
          }
          content_partial_poll_vote_counts {
            __typename
            poll_option {
              __typename
              uuid
              text
            }
            count
          }
        }
      }
      creator {
        __typename
        uuid
        name
        user_profile {
          __typename
          photo
        }
      }
      media {
        __typename
        uuid
        original_url
      }
      content_meta {
        __typename
        uuid
        description
      }
      created_at
    }
  }
`;

export default GetNetworkContent;
