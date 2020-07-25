import React, {
  useState,
  useRef,
} from 'react';
import {
  Animated,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const { REST_BASE_URL } = Constants.manifest.extra;

const SCROLL_DISTANCE_TRIGGER = 200;

function ScreenCard({
  uuid,
  header,
  headerImageSrc = '',
  stamp = '',
  children,
}) {
  const hasAnimated = useRef(false);
  const imageSrc = (
    (headerImageSrc || '').length === 0
      ? `${REST_BASE_URL}/avatar/${uuid}`
      : headerImageSrc
  );
  const animation = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.screenCard}>
      <View style={styles.header}>
        <View style={styles.headerImageWrapper}>
          <Image
            style={styles.headerImage}
            source={{ uri: imageSrc }}
          />

          {stamp.length > 0 &&
            <Text style={styles.stamp}>{stamp}</Text>
          }
        </View>
      </View>

      <Animated.View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          backgroundColor: animation.interpolate({
            inputRange: [0, SCROLL_DISTANCE_TRIGGER],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            extrapolate: 'clamp',
          }),
        }}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={['top']}
        >
          {header}
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animation } } }],
          { useNativeDriver: false },
        )}
      >
        <View style={styles.headerSpacer} />

        <Animated.View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderTopLeftRadius: animation.interpolate({
                inputRange: [0, SCROLL_DISTANCE_TRIGGER],
                outputRange: [55, 0],
                extrapolate: 'clamp',
              }),
              borderTopRightRadius: animation.interpolate({
                inputRange: [0, SCROLL_DISTANCE_TRIGGER],
                outputRange: [55, 0],
                extrapolate: 'clamp',
              }),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: -10,
              },
              shadowOpacity: 0.5,
              shadowRadius: 40,
              elevation: 20,
              overflow: 'visible',
              width: '100%',
              minHeight: '100%',
              paddingTop: 40,
              paddingRight: 20,
              paddingLeft: 20,
            }}
        >
          {children}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenCard: {
    flexGrow: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  safeArea: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stamp: {
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 24,
    fontFamily: 'Requiem-Display',
    fontWeight: 'bold',
  },
  scrollView: {
  },
  header: {
  },
  headerImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: -10,
  },
  headerImage: {
    width: '100%',
    aspectRatio: 1,
  },
  headerSpacer: {
    width: '100%',
    aspectRatio: 1.75,
  },
  main: {
  },
});

export default ScreenCard;
