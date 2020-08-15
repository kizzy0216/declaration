import React, {
  useState,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Constants from 'expo-constants';
import { setStatusBarStyle } from 'expo-status-bar';

const { REST_BASE_URL } = Constants.manifest.extra;

import {
  ContentTilePagerContext,
  FOCUS_CONTENTS,
  FOCUS_MEDIA,
} from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import ContentCommentModal from '~/components/ContentCommentModal';
import ContentShareModal from '~/components/ContentShareModal';
import ContentMenuModal from '~/components/ContentMenuModal';
import ContentTile from '~/components/ContentTile';
import { TREE_ROOT_ID } from '~/constants';

const SUSAN = {
  id: 0,
  name: 'Susan Mitchell',
  profile: {
    photo: `${REST_BASE_URL}/avatar/0`
  },
};

const EJ = {
  id: 1,
  name: 'EJ Dickson',
  profile: {
    photo: `${REST_BASE_URL}/avatar/1`
  },
}

const SARAH = {
  id: 2,
  name: 'Sarah Todd',
  profile: {
    photo: `${REST_BASE_URL}/avatar/2`
  },
};

const JUSTIN = {
  id: 3,
  name: 'Justin Ravitz',
  profile: {
    photo: `${REST_BASE_URL}/avatar/3`
  },
};

const JOHN = {
  id: 4,
  name: "John D'Ana",
  profile: {
    photo: `${REST_BASE_URL}/avatar/4`
  },
}

const YOGI = {
  id: 5,
  name: 'Yogi Naraine',
  profile: {
    photo: `${REST_BASE_URL}/avatar/5`
  },
}

const ROOT_COMMENT = {
  id: TREE_ROOT_ID,
  author: null,
  text: null,
};

const COMMENT_42 = {
  parentId: ROOT_COMMENT.id,
  id: 42,
  author: EJ,
  text: "Don't fill the silence; leaving pauses in the conversation often prompts sources to say more surprising things. 42",
};

const COMMENT_6 = {
  parentId: COMMENT_42.id,
  id: 6,
  author: SARAH,
  text: "This is EXCELLENT advice and something I wish people had told me when I started out 6",
};

const COMMENT_7 = {
  parentId: COMMENT_42.id,
  id: 7,
  author: JUSTIN,
  text: "Absolutely! (reply to EJ) 7",
};

const COMMENT_8 = {
  parentId: COMMENT_7.id,
  id: 8,
  author: JOHN,
  text: "Absolutely! (reply to Justin above) 8",
};

const COMMENT_8889 = {
  parentId: COMMENT_8.id,
  id: 8889,
  author: SARAH,
  text: "Absolutely! (nested reply to John above) 8889",
};

const COMMENT_88 = {
  parentId: COMMENT_42.id,
  id: 88,
  author: JUSTIN,
  text: "Absolutely, reply to EJ! 88",
};

const COMMENT_89 = {
  parentId: COMMENT_42.id,
  id: 89,
  author: JOHN,
  text: "Wow, it really do be like that sometimes 89",
};

const COMMENT_9 = {
  parentId: COMMENT_89.id,
  id: 9,
  author: JUSTIN,
  text: "Testing third level replies 9",
};

const COMMENT_99 = {
  parentId: COMMENT_89.id,
  id: 99,
  author: JUSTIN,
  text: "Testing third level replies take II 99",
};

const COMMENT_999 = {
  parentId: COMMENT_89.id,
  id: 999,
  author: JUSTIN,
  text: "Testing third level replies take III 999",
};

const COMMENT_8888 = {
  parentId: COMMENT_42.id,
  id: 8888,
  author: JOHN,
  text: "Wow 8888",
};

const COMMENT_1 = {
  parentId: ROOT_COMMENT.id,
  id: 1,
  author: JUSTIN,
  text: "Introduce yourself to EVERYONE, get their email, phone number (lol i'm old), follow up. 1",
};

const COMMENT_2 = {
  parentId: ROOT_COMMENT.id,
  id: 2,
  author: JOHN,
  text: 'Use “Tell me” in phrasing your questions, as in ‘Tell me about what you saw’ instead of ‘What did you see?’ Or ‘Tell me about was going through your mind’ instead of ‘What did you think?’ It puts the subject in storytelling mode and invites much richer responses. 2',
};

const COMMENT_LOREM = {
  parentId: ROOT_COMMENT.id,
  id: 3,
  author: JOHN,
  text: 'Lorem ipsum dolor sit amet et magn usually takes six months to be fulfilled and fulfilled in a reasonable     amount of time without    having to be fulfilled again every    time you think    it    is wrong or wrong and   you  should   be prepared to 3',
};

const MOCK_TILES = [
  {
    key: -2,
    id: -2,
    heading: "We are hiring",
    subHeading: "Senior Graphic Designer",
    creator: JUSTIN,
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-jounralism-background.jpg'},
    opportunityListing: {
      company: {
        id: 0,
        name: 'Apple',
        photo: 'https://files-85hfqrnl6.vercel.app/apple.png',
      },
      callToAction: {
        href: 'mailto:nickdandakis@gmail.com'
      },
      criteria: [
        {
          id: 0,
          text: '5 years of experience',
        },
        {
          id: 1,
          text: 'Responsive web design',
        },
        {
          id: 2,
          text: 'Excellent time management',
        },
      ],
    },
  },
  {
    key: -22,
    id: -22,
    heading: "We are hiring",
    subHeading: "Senior Graphic Designer",
    creator: JUSTIN,
    opportunityListing: {
      company: {
        id: 0,
        name: 'Apple',
        photo: 'https://files-85hfqrnl6.vercel.app/apple.png',
      },
      callToAction: {
        href: 'mailto:nickdandakis@gmail.com'
      },
      criteria: [
        {
          id: 0,
          text: '5 years of experience',
        },
        {
          id: 1,
          text: 'Responsive web design',
        },
        {
          id: 2,
          text: 'Excellent time management',
        },
      ],
    },
  },
  {
    key: -1,
    id: -1,
    heading: "I'm available and looking for a new job as an interior designer",
    body: "I've created, managed, and implemented every step of client projects including materials.",
    creator: JOHN,
    availabilityListing: {
      callToAction: {
        href: 'mailto:nickdandakis@gmail.com'
      },
      criteria: [
        {
          id: 0,
          text: '3+ years of professional experience',
        },
        {
          id: 1,
          text: 'Strong knowledge of trade sources',
        },
        {
          id: 2,
          text: 'Extreme attention to detail',
        },
      ],
    },
  },
  {
    key: 0,
    id: 0,
    heading: "Journalists: what is the best reporting advice you've gotten during your career?",
    creator: SUSAN,
    meta: {
      description: '#journo #advice',
      mentions: [],
    },
    commentsById: {
      [ROOT_COMMENT.id]: ROOT_COMMENT,
      42: COMMENT_42,
      6: COMMENT_6,
      7: COMMENT_7,
      8: COMMENT_8,
      88: COMMENT_88,
      89: COMMENT_89,
      9: COMMENT_9,
      99: COMMENT_99,
      999: COMMENT_999,
      8888: COMMENT_8888,
      8889: COMMENT_8889,
      1: COMMENT_1,
      2: COMMENT_2,
      3: COMMENT_LOREM,
    },
    commentTree: {
      parentId: null,
      id: ROOT_COMMENT.id,
      children: [
        {
          parentId: ROOT_COMMENT.id,
          id: COMMENT_42.id,
          children: [
            {
              parentId: COMMENT_42.id,
              id: COMMENT_6.id,
              children: [],
            },
            {
              parentId: COMMENT_42.id,
              id: COMMENT_7.id,
              children: [
                {
                  parentId: COMMENT_7.id,
                  id: COMMENT_8.id,
                  children: [
                    {
                      parentId: COMMENT_8.id,
                      id: COMMENT_8889.id,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              parentId: COMMENT_42.id,
              id: COMMENT_89.id,
              children: [
                {
                  parentId: COMMENT_89.id,
                  id: COMMENT_9.id,
                  children: [],
                },
                {
                  parentId: COMMENT_89.id,
                  id: COMMENT_99.id,
                  children: [],
                },
                {
                  parentId: COMMENT_89.id,
                  id: COMMENT_999.id,
                  children: [],
                },
              ],
            },
            {
              parentId: COMMENT_42.id,
              id: COMMENT_8888.id,
              children: [],
            },
            {
              parentId: COMMENT_42.id,
              id: COMMENT_88.id,
              children: [],
            },
          ],
        },
        {
          parentId: ROOT_COMMENT.id,
          id: COMMENT_1.id,
          children: [],
        },
        {
          parentId: ROOT_COMMENT.id,
          id: COMMENT_2.id,
          children: [],
        },
        {
          parentId: ROOT_COMMENT.id,
          id: COMMENT_LOREM.id,
          children: [],
        },
      ],
    },
  },
  {
    key: 1,
    id: 1,
    heading: 'Is it true that Series A financing usually takes six months to a year?',
    creator: SARAH,
    poll: {
      id: 0,
      options: [
        {
          id: 0,
          text: 'Yes',
        },
        {
          id: 1,
          text: 'No',
        },
      ],
    },
  },
  {
    key: 11112,
    id: 11112,
    heading: 'Is it true that Series A financing usually takes six months to a year?',
    creator: SARAH,
    poll: {
      id: 0,
      options: [
        {
          id: 0,
          text: 'Yes',
          count: 300,
        },
        {
          id: 1,
          text: 'No',
          count: 46,
        },
      ],
    },
  },
  {
    key: 111,
    id: 111,
    heading: 'Is it true that Series A financing usually takes six months to a year? I am really writing a lot here wowee maybe I should consider reducing this.',
    creator: EJ,
    poll: {
      id: 0,
      options: [
        {
          id: 0,
          text: 'Yuuuuuuuup, it absolutely does',
        },
        {
          id: 1,
          text: 'Nope, no way ez pz money',
        },
      ],
    },
    meta: {
      description: 'Looking to raise a round, hmu! #seriesA #advice #grind #hashtag #averylongoneman #anotherone #anotheroneone #anotheroneanother #anotheroneoneanother',
      mentions: [],
    },
  },
  {
    key: 2,
    id: 2,
    heading: 'Should I hire a virtual assistant?',
    creator: JOHN,
    poll: {
      id: 1,
      options: [
        {
          id: 2,
          text: 'Yes, definitely',
        },
        {
          id: 3,
          text: 'No, hire an IRL assistant',
        },
        {
          id: 4,
          text: 'No, assistants are not worth it',
        },
      ],
    },
  },
  {
    key: 222,
    id: 222,
    heading: 'Should I hire a virtual assistant?',
    creator: JOHN,
    poll: {
      id: 1,
      options: [
        {
          id: 2,
          text: 'Yes, definitely',
          count: 230,
        },
        {
          id: 3,
          text: 'No, hire an IRL assistant',
          count: 123,
        },
        {
          id: 4,
          text: 'No, assistants are not worth it',
          count: 2,
        },
      ],
    },
  },
  {
    key: 3,
    id: 3,
    heading: "Journalists: what is the best reporting advice you've gotten during your career?",
    creator: SUSAN,
    meta: {
      description: 'Just another aspiring journalist asking the easy questions. #journo #advice',
      mentions: [],
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-jounralism-background.jpg'},
  },
  {
    key: 4,
    id: 4,
    heading: 'Is it true that Series A financing usually takes six months to a year?',
    creator: YOGI,
    poll: {
      id: 0,
      options: [
        {
          id: 0,
          text: 'Yes',
        },
        {
          id: 1,
          text: 'No',
        },
      ],
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-vc-background.jpg'},
  },
  {
    key: 444,
    id: 444,
    heading: 'Is it true that Series A financing usually takes six months to a year? I am really writing a lot here wowee maybe I should consider reducing this.',
    creator: EJ,
    poll: {
      id: 0,
      options: [
        {
          id: 0,
          text: 'Yuuuuuuuup, it absolutely does',
        },
        {
          id: 1,
          text: 'Nope, no way ez pz money',
        },
      ],
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-money-background.jpg'},
  },
  {
    key: 5,
    id: 5,
    heading: 'Should I hire a virtual assistant?',
    creator: SUSAN,
    poll: {
      id: 1,
      options: [
        {
          id: 2,
          text: 'Yes, definitely',
        },
        {
          id: 3,
          text: 'No, hire an IRL assistant',
        },
        {
          id: 4,
          text: 'No, assistants are not worth it',
        },
      ],
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-assistant-background.jpg'},
  },
  {
    key: 6,
    id: 6,
    creator: JOHN,
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-mosque-background.jpg'},
  },
  {
    key: 7,
    id: 7,
    creator: JOHN,
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-fashion-background.mp4'},
  },
];

function ContentTilePager({ children }) {
  const [isMenuModalActive, setIsMenuModalActive] = useState(false);
  const [isCommentModalActive, setIsCommentModalActive] = useState(false);
  const [isShareModalActive, setIsShareModalActive] = useState(false);

  const { setTheme } = useContext(InterfaceContext);
  const {
    focus,
    activeTileIndex,
    setActiveTileIndex,
    setFocus,
  } = useContext(ContentTilePagerContext);

  function handlePageSelected({ nativeEvent }) {
    const { position } = nativeEvent;
    const tile = MOCK_TILES[position];

    setTheme((tile.media ? 'light' : 'dark'));
    setActiveTileIndex(position);
    setIsMenuModalActive(false);
    setIsCommentModalActive(false);
    setIsShareModalActive(false);
  }

  return (
    <View style={styles.contentTilePager}>
      <ContentCommentModal
        content={MOCK_TILES[activeTileIndex]}
        isVisible={isCommentModalActive}
        onClose={() => setIsCommentModalActive(false)}
      />
      <ContentShareModal
        content={MOCK_TILES[activeTileIndex]}
        isVisible={isShareModalActive}
        onClose={() => setIsShareModalActive(false)}
      />
      <ContentMenuModal
        content={MOCK_TILES[activeTileIndex]}
        isVisible={isMenuModalActive}
        onClose={() => setIsMenuModalActive(false)}
      />

      <ViewPager
        orientation="vertical"
        pageMargin={0}
        showPageIndicator={false}
        initialPage={0}
        style={styles.viewPager}
        onPageSelected={handlePageSelected}
      >
        {MOCK_TILES.map((tile, index) => (
          <ContentTile
            {...tile}
            index={index}
            onCommentRequest={() => setIsCommentModalActive(true)}
            onShareRequest={() => setIsShareModalActive(true)}
            onMenuRequest={() => setIsMenuModalActive(true)}
          />
        ))}
      </ViewPager>
    </View>
  );
}

const styles = StyleSheet.create({
  contentTilePager: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  }
});

export default ContentTilePager;
