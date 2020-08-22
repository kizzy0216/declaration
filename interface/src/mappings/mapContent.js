import mapDateTime from './mapDateTime';
import mapUser from './mapUser';
import mapMedia from './mapMedia';
import mapContentPoll from './mapContentPoll';

const mapContentOpportunityListingCriteria = ({
  opportunity_listing_criteria,
}) => ({
  uuid: opportunity_listing_criteria.uuid,
  text: opportunity_listing_criteria.text,
});

const mapContentOpportunityListing = ({
  uuid,
  content_partial_opportunity_listing_criteria,
}) => {
  if (!uuid || !content_partial_opportunity_listing_criteria) {
    return null;
  }

  return {
    uuid,
    criteria: content_partial_opportunity_listing_criteria.map(mapContentOpportunityListingCriteria),
  };
};

const mapContentAvailabilityListingCredential = ({
  availability_listing_credential,
}) => ({
  uuid: availability_listing_credential.uuid,
  text: availability_listing_credential.text,
});

const mapContentAvailabilityListing = ({
  uuid,
  content_partial_availability_listing_credentials,
}) => {
  if (!uuid || !content_partial_availability_listing_credentials) {
    return null;
  }

  return {
    uuid,
    credentials: content_partial_availability_listing_credentials.map(mapContentAvailabilityListingCredential),
  }
};

const mapContentMeta = ({
  uuid,
  description,
}) => ({
  uuid,
  description,
});

const mapContent = ({
  uuid,
  heading,
  sub_heading,
  body,
  creator,
  media,
  content_meta = {},
  content_partial = {},
}) => ({
  uuid,
  heading,
  subHeading: sub_heading,
  body,
  creator: mapUser(creator),
  media: media && mapMedia(media),
  meta: mapContentMeta(content_meta || {}),
  poll: mapContentPoll((content_partial || {}).content_partial_poll || {}),
  availabilityListing: mapContentAvailabilityListing((content_partial || {}).content_partial_availability_listing || {}),
  opportunityListing: mapContentOpportunityListing((content_partial || {}).content_partial_opportunity_listing || {}),
});

export default mapContent;
