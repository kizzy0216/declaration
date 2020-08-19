import React, {
  useState,
  createContext,
  useContext,
} from 'react';
import { useMutation } from 'urql';

import { UserContext } from '~/contexts/UserContext';
import { NetworkContext } from '~/contexts/NetworkContext';
import InsertContentOne from '~/mutations/InsertContentOne';
import InsertContentPartialPollOne from '~/mutations/InsertContentPartialPollOne';
import InsertContentPartialOpportunityListingOne from '~/mutations/InsertContentPartialOpportunityListingOne';
import InsertContentPartialAvailabilityListingOne from '~/mutations/InsertContentPartialAvailabilityListingOne';

import {
  BASE_CONTENT_TEMPLATE_TYPE,
  POLL_CONTENT_TEMPLATE_TYPE,
  OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
  AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
} from '@shared/constants';
import useMediaUpload from '~/hooks/useMediaUpload';

const initialState = () => ({
  type: '',
  heading: '',
  subHeading: '',
  body: '',
  meta: {
    description: '',
    mentions: [],
  },
  media: {
    localAsset: null,
    originalUrl: '',
  },
  poll: {
    options: [],
  },
  opportunityListing: {
    criteria: [],
  },
  availabilityListing: {
    credentials: [],
  },
});

export const CreateContentContext = createContext(initialState());

export const CreateContentContextProvider = ({ children }) => {
  const { user: authenticatedUser } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const {
    isFetching: isFetchingMedia,
    handleUpload,
  } = useMediaUpload();

  const [type, setType] = useState(initialState().type);
  const [heading, setHeading] = useState(initialState().heading);
  const [subHeading, setSubHeading] = useState(initialState().subHeading);
  const [body, setBody] = useState(initialState().body);
  const [meta, setMeta] = useState(initialState().meta);
  const [media, setMedia] = useState(initialState().media);
  const [poll, setPoll] = useState(initialState().poll);
  const [
    opportunityListing,
    setOpportunityListing,
  ] = useState(initialState().opportunityListing);
  const [
    availabilityListing,
    setAvailabilityListing,
  ] = useState(initialState().availabilityListing);

  const [
    insertContentResult,
    insertContent,
  ] = useMutation(InsertContentOne);
  const [
    insertPollPartialResult,
    insertPollPartial,
  ] = useMutation(InsertContentPartialPollOne);
  const [
    insertOpportunityListingPartialResult,
    insertOpportunityListingPartial,
  ] = useMutation(InsertContentPartialOpportunityListingOne);
  const [
    insertAvailabilityListingPartialResult,
    insertAvailabilityListingPartial,
  ] = useMutation(InsertContentPartialAvailabilityListingOne);

  // NOTE: There's currently a Hasura bug when inserting nested 1:1 objects
  // https://github.com/hasura/graphql-engine/issues/2576
  // So we're inserting the partial first, and then using the inserted UUID to
  // associate the partial with content
  async function create() {
    const params = {
      creator_uuid: authenticatedUser.uuid,
      network_uuid: activeNetwork.uuid,
      heading,
      description: meta.description,
      content_meta_mentions: meta.mentions.map(({ uuid }) => ({ user_uuid: uuid })),
    };

    const mediaParams = {
      media: null,
    };
    if (media.localAsset) {
      const uploadedAsset = await handleUpload({ asset: media.localAsset });
      mediaParams.media = {
        data: {
          original_width: uploadedAsset.width,
          original_height: uploadedAsset.height,
          original_url: uploadedAsset.url,
          type: uploadedAsset.type,
          uploader_uuid: authenticatedUser.uuid,
        },
      };
    }

    if (type === BASE_CONTENT_TEMPLATE_TYPE) {
      return insertContent({
        ...params,
        ...mediaParams,
      });
    } else if (type === POLL_CONTENT_TEMPLATE_TYPE) {
      const partialResult = await insertPollPartial({
        content_partial_poll_options: poll.options.map((optionText) => ({
          poll_option: {
            data: {
              text: optionText,
            },
          },
        })),
      });

      const { uuid: contentPartialUuid } = partialResult
        .data
        .insert_content_partial_poll_one
        .content_partial;

      return insertContent({
        ...params,
        ...mediaParams,
        content_partial_uuid: contentPartialUuid,
      });
    } else if (type === OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE) {
      const partialResult = await insertOpportunityListingPartial({
        content_partial_opportunity_listing_criteria: opportunityListing.criteria.map((criteriaText) => ({
          opportunity_listing_criteria: {
            data: {
              text: criteriaText,
            },
          },
        })),
      });

      const { uuid: contentPartialUuid } = partialResult
        .data
        .insert_content_partial_opportunity_listing_one
        .content_partial;

      return insertContent({
        ...params,
        ...mediaParams,
        content_partial_uuid: contentPartialUuid,
      });
    } else if (type === AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE) {
      const partialResult = await insertAvailabilityListingPartial({
        content_partial_availability_listing_credentials: availabilityListing.credentials.map((credentialText) => ({
          availability_listing_credential: {
            data: {
              text: credentialText,
            },
          },
        })),
      });

      const { uuid: contentPartialUuid } = partialResult
        .data
        .insert_content_partial_availability_listing_one
        .content_partial;

      return insertContent({
        ...params,
        ...mediaParams,
        content_partial_uuid: contentPartialUuid,
      });
    }
  }

  return (
    <CreateContentContext.Provider
      value={{
        type,
        heading,
        subHeading,
        body,
        meta,
        media,
        poll,
        opportunityListing,
        availabilityListing,

        setType,
        setHeading,
        setSubHeading,
        setBody,
        setMeta,
        setMedia,
        setPoll,
        setOpportunityListing,
        setAvailabilityListing,

        create,
        isCreating: (
          insertContentResult.fetching ||
          insertPollPartialResult.fetching ||
          insertOpportunityListingPartialResult.fetching ||
          insertAvailabilityListingPartialResult.fetching ||
          isFetchingMedia
        )
      }}
    >
      {children}
    </CreateContentContext.Provider>
  );
}
