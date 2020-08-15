import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContentTilePagerContextProvider } from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import FeedHeader from '~/components/FeedHeader';
import ContentTilePager from '~/components/ContentTilePager';

function FeedScreen({ navigation }) {
  const animation = useRef(new Animated.Value(1)).current;
  const {
    isVisible: isInterfaceVisible,
    theme,
  } = useContext(InterfaceContext);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (isInterfaceVisible ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isInterfaceVisible]);

  return (
    <View style={styles.screen}>
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [{
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            }],
          }}
          pointerEvents={isInterfaceVisible ? 'auto' : 'none'}
        >
          <FeedHeader
            theme={theme}
            onNetworkAdd={() => navigation.navigate('NetworkMembershipSelect')}
            onNetworkCreate={() => navigation.navigate('NetworkAccessRequest')}
            onCalendarPress={() => navigation.navigate('Events')}
            onMessagesPress={() => navigation.navigate('Messaging')}
          />
        </Animated.View>
      </SafeAreaView>

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
