import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const { REST_BASE_URL } = Constants.manifest.extra;

import ScreenHeader from '~/components/ScreenHeader';
import CallToActionButton from '~/components/CallToActionButton';
import EmptyState from '~/components/EmptyState';
import NoNotificationsIcon from '@shared/components/icons/NoNotificationsIcon';
import { GRAY } from '~/constants';

const MOCK_ITEMS = [];
// const MOCK_ITEMS = [
//   {
//     id: 0,
//     imageSrc: `${REST_BASE_URL}/avatar/0`,
//     heading: 'Agatha Sohn',
//     subHeading: 'Wants to connect',
//     actionLabel: 'Connect',
//   },
//   {
//     id: 1,
//     imageSrc: `${REST_BASE_URL}/avatar/1`,
//     heading: 'Danesh Chowritmootoo',
//     subHeading: 'Mentioned you',
//   },
//   {
//     id: 2,
//     imageSrc: `${REST_BASE_URL}/avatar/2`,
//     heading: 'Leonidas Papadopoulou',
//     subHeading: 'Wants to connect',
//     actionLabel: 'Connect',
//   },
// ];

function NotificationsScreen({ navigation }) {
  const [isFetching, setIsFetching] = useState(false);

  function handleRefresh() {
    setIsFetching(true);

    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        heading="Activity"
        rightElement={<></>}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        }
      >
        {MOCK_ITEMS.length > 0 
          ? (
            MOCK_ITEMS.map((item) => (
              <View
                style={styles.callToActionWrapper}
                key={item.id}
              >
                <CallToActionButton
                  {...item}
                />
              </View>
            ))
          ) : (
            <View style={styles.emptyStateWrapper}>
              <EmptyState
                heading="No new notifications"
                icon={(
                  <NoNotificationsIcon
                    width={64}
                    height={64}
                    fill={GRAY}
                  />
                )}
              />
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  contentContainer: {
    flex: 1,
  },
  emptyStateWrapper: {
    flex: 1,
    marginTop: -60, // offset ScreenHeader
  },
  callToActionWrapper: {
    marginBottom: 10,
  },
});

export default NotificationsScreen;
