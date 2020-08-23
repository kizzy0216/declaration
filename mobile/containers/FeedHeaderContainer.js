import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
}  from 'react-native';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import { InterfaceContext } from '~/contexts/InterfaceContext';
import FeedHeader from '~/components/FeedHeader';

function FeedHeaderContainer() {
  const animation = useRef(new Animated.Value(1)).current;
  const {
    isVisible: isInterfaceVisible,
    theme,
  } = useContext(InterfaceContext);
  const {
    isFetchingNewerItems,
    isFetchingOlderItems,
  } = useContext(ContentTilePagerContext);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: (isInterfaceVisible ? 1 : 0),
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isInterfaceVisible]);

  return (
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
        isFetching={isFetchingNewerItems || isFetchingOlderItems}
        onNetworkAdd={() => navigation.navigate('NetworkMembershipSelect')}
        onNetworkCreate={() => navigation.navigate('NetworkAccessRequest')}
        onCalendarPress={() => navigation.navigate('Events')}
        onMessagesPress={() => navigation.navigate('Messaging')}
      />
    </Animated.View>
  );
}

export default FeedHeaderContainer;
