import mapDateTime from './mapDateTime';
import mapUser from './mapUser';
import mapMedia from './mapMedia';
import mapContentPoll from './mapContentPoll';
import mapCompany from './mapCompany';
import mapCallToAction from './mapCallToAction';

const mapContentOpportunityListingCriteria = ({
  opportunity_listing_criteria,
}) => ({
  uuid: opportunity_listing_criteria.uuid,
  text: opportunity_listing_criteria.text,
});

const mapContentOpportunityListing = ({
  uuid,
  content_partial_opportunity_listing_criteria,
  company,
  call_to_action,
}) => {
  if (!uuid || !content_partial_opportunity_listing_criteria) {
    return null;
  }

  return {
    uuid,
    criteria: content_partial_opportunity_listing_criteria.map(mapContentOpportunityListingCriteria),
    callToAction: call_to_action && mapCallToAction(call_to_action),
    company: company && mapCompany(company),
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
  call_to_action,
}) => {
  if (!uuid || !content_partial_availability_listing_credentials) {
    return null;
  }

  return {
    uuid,
    credentials: content_partial_availability_listing_credentials.map(mapContentAvailabilityListingCredential),
    callToAction: call_to_action && mapCallToAction(call_to_action),
  }
};

const mapContentMeta = ({
  uuid,
  description,
}) => ({
  uuid,
  description,
});

const mapContentStar = ({
  amount,
  astronomer,
}) => ({
  amount,
  astronomer: mapUser(astronomer),
});

const mapContent = ({
  uuid,
  heading,
  sub_heading,
  screenshot,
  body,
  creator,
  media,
  content_meta = {},
  content_partial = {},
  content_stars = [],
  created_at,
  content_stars_aggregate,
  content_comments_aggregate,
}) => ({
  uuid,
  heading,
  subHeading: sub_heading,
  body,
  screenshot,
  creator: mapUser(creator),
  media: media && mapMedia(media),
  meta: mapContentMeta(content_meta || {}),
  poll: mapContentPoll((content_partial || {}).content_partial_poll || {}),
  availabilityListing: mapContentAvailabilityListing((content_partial || {}).content_partial_availability_listing || {}),
  opportunityListing: mapContentOpportunityListing((content_partial || {}).content_partial_opportunity_listing || {}),
  stars: content_stars.map(mapContentStar),
  starsByAstronomerUuid: content_stars.reduce((accumulator, content_star) => {
    accumulator[content_star.astronomer_uuid] = mapContentStar(content_star);
    return accumulator;
  }, {}),
  createdAt: created_at && mapDateTime(created_at),
  createdAtTimestampTz: created_at,
  likes: content_stars_aggregate.aggregate.count,
  comments: content_comments_aggregate.aggregate.count,
});

export default mapContent;
