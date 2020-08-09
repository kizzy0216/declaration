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
import Modal from '~/components/Modal';
import ContentTile from '~/components/ContentTile';

const MOCK_TILES = [
  {
    key: 0,
    id: 0,
    heading: "Journalists: what is the best reporting advice you've gotten during your career?",
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/0`
      },
    },
    meta: {
      hashtags: [
        {
          id: 0,
          text: '#journo',
        },
        {
          id: 1,
          text: '#advice',
        },
      ],
      mentions: [],
    },
  },
  {
    key: 1,
    id: 1,
    heading: 'Is it true that Series A financing usually takes six months to a year?',
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/1`
      },
    },
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
    key: 111,
    id: 111,
    heading: 'Is it true that Series A financing usually takes six months to a year? I am really writing a lot here wowee maybe I should consider reducing this.',
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/111`
      },
    },
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
      hashtags: [
        {
          id: 0,
          text: '#seriesA',
        },
        {
          id: 1,
          text: '#advice',
        },
        {
          id: 2,
          text: '#grind',
        },
        {
          id: 3,
          text: '#hashtag',
        },
        {
          id: 4,
          text: '#averylongoneman',
        },
        {
          id: 5,
          text: '#anotherone',
        },
        {
          id: 6,
          text: '#anotheroneone',
        },
        {
          id: 7,
          text: '#anotheroneoneanother',
        },
      ],
      mentions: [],
    },
  },
  {
    key: 2,
    id: 2,
    heading: 'Should I hire a virtual assistant?',
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/2`
      },
    },
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
    key: 3,
    id: 3,
    heading: "Journalists: what is the best reporting advice you've gotten during your career?",
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/3`
      },
    },
    meta: {
      hashtags: [
        {
          id: 0,
          text: '#journo',
        },
        {
          id: 1,
          text: '#advice',
        },
      ],
      mentions: [],
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-jounralism-background.jpg'},
  },
  {
    key: 4,
    id: 4,
    heading: 'Is it true that Series A financing usually takes six months to a year?',
    creator: {
      id: 0,
      name: 'Yogi Naraine',
      profile: {
        photo: `${REST_BASE_URL}/avatar/4`
      },
    },
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
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/444`
      },
    },
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
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/5`
      },
    },
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
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/6`
      },
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-mosque-background.jpg'},
  },
  {
    key: 7,
    id: 7,
    creator: {
      id: 0,
      name: 'Susan Mitchell',
      profile: {
        photo: `${REST_BASE_URL}/avatar/6`
      },
    },
    media: {uri: 'https://s3.amazonaws.com/stage.static.declaration.net/mock-fashion-background.mp4'},
  },
];

function ContentTilePager({ children }) {
  const [isModalActive, setIsModalActive] = useState(false);
  const { setTheme } = useContext(InterfaceContext);
  const {
    focus,
    setActiveTileIndex,
    setFocus,
  } = useContext(ContentTilePagerContext);

  function handleMenuRequest() {
    setIsModalActive(true);
  }

  function handlePageSelected({ nativeEvent }) {
    const { position } = nativeEvent;
    const tile = MOCK_TILES[position];

    setTheme((tile.media ? 'light' : 'dark'));
    setActiveTileIndex(position);

    if (!tile.media && focus === FOCUS_MEDIA) {
      setFocus(FOCUS_CONTENTS);
    }
  }

  return (
    <View style={styles.contentTilePager}>
      <Modal
        isVisible={isModalActive}
        onClose={() => setIsModalActive(false)}
      >
        <Text>Share</Text>
        <Text>Edit</Text>
        <Text>Delete</Text>
      </Modal>

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
            onMenuRequest={handleMenuRequest}
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
