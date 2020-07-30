import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';
import { WINDOW_WIDTH } from '~/constants';

const { REST_BASE_URL } = Constants.manifest.extra;
const PULL_DOWN_DISTANCE = WINDOW_WIDTH * -0.5;
const PULL_UP_DISTANCE = WINDOW_WIDTH * 0.6;

function ScreenCard({
  uuid,
  renderHeader,
  headerImageSrc = '',
  stamp = '',
  actions = [],
  children,
  isFetching,
}) {
  const imageSrc = (
    (headerImageSrc || '').length === 0
      ? `${REST_BASE_URL}/avatar/${uuid}`
      : headerImageSrc
  );

  const statusBarStyle = useRef('light');
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

  const handleScroll = useCallback(({ nativeEvent: { contentOffset: { y } } }) => {
    if (y > PULL_UP_DISTANCE && statusBarStyle.current === 'light') {
      setStatusBarStyle('dark');
      statusBarStyle.current = 'dark';
    }

    if (y <= PULL_UP_DISTANCE && statusBarStyle.current === 'dark') {
      setStatusBarStyle('light');
      statusBarStyle.current = 'light';
    }
  })

  return (
    <View style={styles.screenCard}>
      <View style={styles.header}>
        <View style={styles.headerImageWrapper}>
          <Animated.View
            style={{
              ...styles.gradientWrapper,
              opacity: scrollAnimation.interpolate({
                inputRange: [PULL_DOWN_DISTANCE, 0],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            }}
          >
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
              style={styles.gradient}
            />
          </Animated.View>

          {isFetching &&
            <View style={styles.spinnerIconWrapper}>
              <AnimatedSpinnerIcon
                width={24}
                height={24}
                fill="white"
              />
            </View>
          }

          <View style={styles.imageWrapper}>
            <Image
              style={styles.headerImage}
              source={{ uri: imageSrc }}
            />
          </View>
        </View>

        {stamp.length > 0 &&
          <Text style={styles.stamp}>{stamp}</Text>
        }
      </View>

      <Animated.View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          backgroundColor: scrollAnimation.interpolate({
            inputRange: [0, PULL_UP_DISTANCE],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            extrapolate: 'clamp',
          }),
          opacity: scrollAnimation.interpolate({
            inputRange: [PULL_DOWN_DISTANCE, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={['top']}
        >
          {renderHeader({ scrollAnimation })}
        </SafeAreaView>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollAnimation } } }],
          {
            useNativeDriver: false,
            listener: handleScroll,
          },
        )}
      >
        <View style={styles.headerSpacer} />

        <Animated.View
            style={{
              borderTopLeftRadius: scrollAnimation.interpolate({
                inputRange: [0, PULL_UP_DISTANCE],
                outputRange: [55, 0],
                extrapolate: 'clamp',
              }),
              borderTopRightRadius: scrollAnimation.interpolate({
                inputRange: [0, PULL_UP_DISTANCE],
                outputRange: [55, 0],
                extrapolate: 'clamp',
              }),
              ...styles.main,
            }}
        >
          {actions.length > 0 &&
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: scrollAnimation.interpolate({
                      inputRange: [0, PULL_UP_DISTANCE],
                      outputRange: [-32, 16],
                      extrapolate: 'clamp',
                    })
                  },
                ],
                opacity: scrollAnimation.interpolate({
                  inputRange: [0, PULL_UP_DISTANCE],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
                ...styles.actionsWrapper,
              }}
            >
              {actions.map((action, index) => (
                <TouchableOpacity
                  onPress={action.onPress}
                  key={index}
                  containerStyle={{overflow: 'visible'}}
                >
                  <Animated.View
                    style={{
                      width: scrollAnimation.interpolate({
                        inputRange: [0, PULL_UP_DISTANCE],
                        outputRange: [64, 32],
                        extrapolate: 'clamp',
                      }),
                      height: scrollAnimation.interpolate({
                        inputRange: [0, PULL_UP_DISTANCE],
                        outputRange: [64, 32],
                        extrapolate: 'clamp',
                      }),
                      backgroundColor: action.backgroundColor || 'white',
                      ...styles.action,
                      ...action.style,
                    }}
                  >
                    {action.icon}
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </Animated.View>
          }
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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: -10,
  },
  headerImageWrapper: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    aspectRatio: 0.9,
  },
  headerSpacer: {
    width: '100%',
    aspectRatio: 1.5,
  },
  gradientWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  gradient: {
    width: '100%',
    height: 100,
  },
  spinnerIconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
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
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 100,
  },
  actionsWrapper: {
    position: 'absolute',
    top: 0,
    right: 30,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    overflow: 'visible',
    flexDirection: 'row',
  },
  action: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20,
    overflow: 'visible',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default ScreenCard;
