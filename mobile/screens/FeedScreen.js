import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FeedHeader from '~/components/FeedHeader';

function FeedScreen({ navigation }) {
  return (
    <SafeAreaView>
      <FeedHeader
        onNetworkAdd={() => navigation.navigate('NetworkMembershipSelect')}
        onNetworkCreate={() => navigation.navigate('NetworkAccessRequest')}
        onCalendarPress={() => navigation.navigate('Events')}
        onMessagesPress={() => navigation.navigate('Messaging')}
      />
      <Text>Feed</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default FeedScreen;
