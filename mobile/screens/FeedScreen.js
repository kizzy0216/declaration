import React, { useCallback, useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import FeedHeaderContainer from '~/containers/FeedHeaderContainer';
import ContentTilePager from '~/components/ContentTilePager';

function FeedScreen({ navigation }) {
  const { getItems } = useContext(ContentTilePagerContext);
  useFocusEffect(useCallback(() => {
    getItems();
  }, []));

  return (
    <View style={styles.screen}>
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <FeedHeaderContainer />
      </SafeAreaView>

      <View style={styles.pagerWrapper}>
        <ContentTilePager />
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
