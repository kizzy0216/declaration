import React, {
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContentTilePagerContextProvider } from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import FeedHeader from '~/components/FeedHeader';
import ContentTilePager from '~/components/ContentTilePager';

function FeedScreen({ navigation }) {
  const {
    isVisible: isInterfaceVisible,
    theme,
  } = useContext(InterfaceContext);

  return (
    <View style={styles.screen}>
      {isInterfaceVisible &&
        <SafeAreaView
          style={styles.safeArea}
          contentContainerStyle={styles.contentContainer}
        >
          <FeedHeader
            theme={theme}
            onNetworkAdd={() => navigation.navigate('NetworkMembershipSelect')}
            onNetworkCreate={() => navigation.navigate('NetworkAccessRequest')}
            onCalendarPress={() => navigation.navigate('Events')}
            onMessagesPress={() => navigation.navigate('Messaging')}
          />
        </SafeAreaView>
      }

      <View style={styles.pagerWrapper}>
        <ContentTilePagerContextProvider>
          <ContentTilePager />
        </ContentTilePagerContextProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  safeArea: {
    position: 'absolute',
    width: '100%',
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
  },
  headerWrapper: {
  },
  pagerWrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});

export default FeedScreen;
