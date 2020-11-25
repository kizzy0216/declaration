import React, {
  useState,
  createContext,
  useContext,
} from 'react';
import { useMutation } from 'urql';

import { NetworkContext } from '~/contexts/NetworkContext';
import InsertContentOne from '~/mutations/InsertContentOne';
import InsertContentPollOne from '~/mutations/InsertContentPollOne';
import InsertContentOpportunityListingOne from '~/mutations/InsertContentOpportunityListingOne';
import InsertContentAvailabilityListingOne from '~/mutations/InsertContentAvailabilityListingOne';

import {
  BASE_CONTENT_TEMPLATE_TYPE,
  POLL_CONTENT_TEMPLATE_TYPE,
  OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
  AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
} from '@shared/constants';
import useMediaUpload from '~/hooks/useMediaUpload';
import useContentScreenshotUpload from '../hooks/useContentScreenshotUpload';

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
    callToAction: {
      label: 'Apply now',
      href: '',
    },
    company: {
      name: '',
      photo: '',
      localPhotoAsset: null,
    },
  },
  availabilityListing: {
    credentials: [],
    callToAction: {
      label: 'Contact me',
      href: '',
    },
  }
});

export const CreateContentContext = createContext(initialState());

export const CreateContentContextProvider = ({ children }) => {
  const { activeNetwork } = useContext(NetworkContext);
  const {
    isFetching: isFetchingMedia,
    handleUpload,
  } = useMediaUpload();

  const {
    isFetching: isSavingScreenshot,
    handleScreenshotUpload,
  } = useContentScreenshotUpload();

  const [type, setType] = useState(initialState().type);
  const [heading, setHeading] = useState(initialState().heading);
  const [subHeading, setSubHeading] = useState(initialState().subHeading);
  const [body, setBody] = useState(initialState().body);
  const [meta, setMeta] = useState(initialState().meta);
  const [media, setMedia] = useState(initialState().media);
  const [poll, setPoll] = useState(initialState().poll);
  const [opportunityListing,setOpportunityListing] = useState(initialState().opportunityListing);
  const [availabilityListing,setAvailabilityListing] = useState(initialState().availabilityListing);

  const clearSelections = () => {
    setType(initialState().type)
    setHeading(initialState().heading);
    setSubHeading(initialState().subHeading);
    setBody(initialState().body);
    setMeta(initialState().meta);
    setMedia(initialState().media);
    setPoll(initialState().poll);
    setOpportunityListing(initialState().opportunityListing);
    setAvailabilityListing(initialState().availabilityListing);
  }

  const [
    insertContentResult,
    insertContent,
  ] = useMutation(InsertContentOne);
  const [
    insertPollResult,
    insertPoll,
  ] = useMutation(InsertContentPollOne);
  const [
    insertOpportunityListingResult,
    insertOpportunityListing,
  ] = useMutation(InsertContentOpportunityListingOne);
  const [
    insertAvailabilityListingResult,
    insertAvailabilityListing,
  ] = useMutation(InsertContentAvailabilityListingOne);


  const updateScreenshot = (uuid, uri) => {
    handleScreenshotUpload(uuid, uri)
  }

  // NOTE: There's currently a Hasura bug when inserting nested 1:1 objects
  // https://github.com/hasura/graphql-engine/issues/2576
  // So we're inserting the partial first, and then using the inserted UUID to
  // associate the partial with content
  async function create() {
    const params = {
      network_uuid: activeNetwork.uuid,
      heading,
      sub_heading: subHeading,
      body,
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
        },
      };
    }
    if (opportunityListing.company.localPhotoAsset) {
      const uploadedPhotoAsset = await handleUpload({ asset: opportunityListing.company.localPhotoAsset });
      opportunityListing.company.photo = uploadedPhotoAsset.url;
    }

    // console.log('TYPE', type, params)
    if (type === BASE_CONTENT_TEMPLATE_TYPE) {
      return insertContent({
        ...params,
        ...mediaParams,
      });
    } else if (type === POLL_CONTENT_TEMPLATE_TYPE) {
      return insertPoll({
        ...params,
        ...mediaParams,
        content_partial_poll_options: poll.options.map((optionText) => ({
          poll_option: {
            data: {
              text: optionText,
            },
          },
        })),
      });
    } else if (type === OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE) {
      return insertOpportunityListing({
        ...params,
        ...mediaParams,
        content_partial_opportunity_listing_criteria: opportunityListing.criteria.map((criteriaText) => ({
          opportunity_listing_criteria: {
            data: {
              text: criteriaText,
            },
          },
        })),
        company: {
          name: opportunityListing.company.name,
          photo: opportunityListing.company.photo,
        },
        call_to_action: opportunityListing.callToAction,
      });
    } else if (type === AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE) {
      return insertAvailabilityListing({
        ...params,
        ...mediaParams,
        content_partial_availability_listing_credentials: availabilityListing.credentials.map((credentialText) => ({
          availability_listing_credential: {
            data: {
              text: credentialText,
            },
          },
        })),
        call_to_action: availabilityListing.callToAction,
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
        updateScreenshot,
        create,
        clearSelections,
        isCreating: (
          insertContentResult.fetching ||
          insertPollResult.fetching ||
          insertOpportunityListingResult.fetching ||
          insertAvailabilityListingResult.fetching ||
          isFetchingMedia
        )
      }}
    >
      {children}
    </CreateContentContext.Provider>
  );
}
