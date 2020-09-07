import minimist from 'minimist';

import { fetchHasuraAdmin } from '../utils/api.js';
import aws from '../utils/aws.js';
import uploadFile from '../utils/uploadFile';
import getMediaInformation from '../utils/getMediaInformation';
import asyncForEach from '../utils/asyncForEach';
import InsertContentOne from '../mutations/InsertContentOne.js';
import InsertContentPollOne from '../mutations/InsertContentPollOne.js';
import InsertContentOpportunityListingOne from '../mutations/InsertContentOpportunityListingOne.js';
import InsertContentAvailabilityListingOne from '../mutations/InsertContentAvailabilityListingOne.js';
import {
  BASE_CONTENT_TEMPLATE_TYPE,
  POLL_CONTENT_TEMPLATE_TYPE,
  OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
  AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
} from '../shared/constants';

const argv = minimist(process.argv.slice(2));

insertDefaultNetworkContent({
  help: argv.help,
  creatorUuid: argv['creator-uuid'],
  networkUuid: argv['network-uuid'],
});

async function insert({
  networkUuid,
  creatorUuid,

  filePath,
  mediaType,

  heading,
  subHeading,
  body,
  description,

  poll,
  availabilityListing,
  opportunityListing,

  templateType,
}) {
  const params = {
    network_uuid: networkUuid,
    creator_uuid: creatorUuid,
    heading,
    sub_heading: subHeading,
    body,
    description: description,
    content_meta_mentions: [],
  };

  const mediaParams = {
    media: null,
  };
  if (filePath && mediaType) {
    const { Location: url } = await uploadFile({ filePath });
    const information = await getMediaInformation({ filePath, mediaType });

    mediaParams.media = {
      data: {
        original_width: information.width,
        original_height: information.height,
        original_url: url,
        type: information.contentType,
        uploader_uuid: creatorUuid,
      },
    };
  }

  if (templateType === BASE_CONTENT_TEMPLATE_TYPE) {
    return fetchHasuraAdmin
      .mutation(InsertContentOne, {
        ...params,
        ...mediaParams,
      })
      .toPromise();
  } else if (templateType === POLL_CONTENT_TEMPLATE_TYPE) {
    return fetchHasuraAdmin
      .mutation(InsertContentPollOne, {
        ...params,
        ...mediaParams,
        content_partial_poll_options: poll.options.map((optionText) => ({
          poll_option: {
            data: {
              text: optionText,
            },
          },
        })),
      })
      .toPromise();
  } else if (templateType === OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE) {
    const { Location: companyPhoto } = await uploadFile({ filePath: opportunityListing.company.filePath });

    return fetchHasuraAdmin
      .mutation(InsertContentOpportunityListingOne, {
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
          photo: companyPhoto,
        },
        call_to_action: opportunityListing.callToAction,
      })
      .toPromise();
  } else if (templateType === AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE) {
    return fetchHasuraAdmin
      .mutation(InsertContentAvailabilityListingOne, {
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
      })
      .toPromise();
  }
}

async function insertDefaultNetworkContent ({
  help,
  creatorUuid,
  networkUuid,
}) {
  if (argv.help) {
    return console.log('Expects --creator-uuid and --network-uuid');
  }

  if (!creatorUuid || creatorUuid.length === 0 || typeof creatorUuid !== 'string') {
    return console.error('Missing --creator-uuid');
  }
  if (!networkUuid || networkUuid.length === 0 || typeof networkUuid !== 'string') {
    return console.error('Missing --network-uuid');
  }

  const posts = [
    // Post 10
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/positive-social-impact.mp4',
      mediaType: 'video',
      description: '#positivesocialimpact',
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
    // Post 9
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/influencer.mp4',
      mediaType: 'video',
      description: '#positivesocialimpact',
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
    // Post 8
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/mental-health.mp4',
      mediaType: 'video',
      heading:"I'm curious, have you managed to maintain a daily ritual to calm potential anxiety or worry during these difficult times?",
      description: '#positivethinking #inthistogether #power #empowerment #sessions',
      templateType: POLL_CONTENT_TEMPLATE_TYPE,
      poll: {
        options: [
          'Yes, daily',
          'Maybe once a week',
          'No, not really',
        ]
      },
    },
    // Post 7
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/locked-focus.mp4',
      mediaType: 'video',
      description: 'This was the result when I locked the focus on my iPhone and filmed in slow motion. #lockedfocus #slowmo #bees #howto',
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
    // Post 6
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/opportunity.jpg',
      mediaType: 'image',
      description: '#jobpost #opportunity #newcareer',
      templateType: OPPORTUNITY_LISTING_CONTENT_TEMPLATE_TYPE,
      heading: 'We Are Hiring',
      subHeading: 'Senior Interaction Designer',
      opportunityListing: {
        criteria: [
          '5 years of experience',
          'Website and app development',
          'Excellent time-management',
        ],
        callToAction: {
          label: 'Apply now',
          href: 'declaration.net',
        },
        company: {
          name: 'Apple',
          filePath: '../assets/apple-logo.png',
        },
      },
    },
    // Post 5
    {
      networkUuid,
      creatorUuid,
      filePath: null,
      mediaType: null,
      heading: "What's the best advice you can give to someone who just started their career right out of college?",
      description: '#freshstart #recentgraduate',
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
    // Post 4
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/mk-gee.mp4',
      mediaType: 'video',
      description: "I've been obsessed with this new artist MK Gee Dime:Quarterback #mkgee #dime #quarterback",
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
    // Post 3
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/availability.jpg',
      mediaType: 'image',
      heading: "I'm available and looking for a new job as an interior designer.",
      body: "I've created, managedd, and implemented every step of client projects including sourcing materials.",
      description: '#available #ready #newhire',
      availabilityListing: {
        credentials: [
          '3+ years of professional experience',
          'Strong knowledge of trade sources',
          'Extreme attention to detail',
        ],
        callToAction: {
          label: 'Contact me',
          href: 'declaration.net',
        },
      },
      templateType: AVAILABILITY_LISTING_CONTENT_TEMPLATE_TYPE,
    },
    // Post 2
    {
      networkUuid,
      creatorUuid,
      filePath: null,
      mediaType: null,
      heading: 'Do you think quick survey feedback is an important feature on this app?',
      description: '#feedback #featureset',
      poll: {
        options: [
          'Yes',
          'No',
        ],
      },
      templateType: POLL_CONTENT_TEMPLATE_TYPE,
    },
    // Post 1
    {
      networkUuid,
      creatorUuid,
      filePath: '../assets/welcome.mp4',
      mediaType: 'video',
      description: 'Welcome to your new community space. #community #private',
      templateType: BASE_CONTENT_TEMPLATE_TYPE,
    },
  ];

  asyncForEach(posts, async (post) => {
    const response = await insert(post);
    console.dir(response);
  });
};
