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
import { TouchableOpacity } from 'react-native-gesture-handler';

const { REST_BASE_URL } = Constants.manifest.extra;

const SCROLL_DISTANCE_TRIGGER = 200;

function ScreenCard({
  uuid,
  header,
  headerImageSrc = '',
  stamp = '',
  actions = [],
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
              ...styles.main,
            }}
        >
          {actions.length > 0 &&
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, SCROLL_DISTANCE_TRIGGER],
                      outputRange: [-32, 16],
                      extrapolate: 'clamp',
                    })
                  },
                ],
                opacity: animation.interpolate({
                  inputRange: [0, SCROLL_DISTANCE_TRIGGER],
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
                      width: animation.interpolate({
                        inputRange: [0, SCROLL_DISTANCE_TRIGGER],
                        outputRange: [64, 32],
                        extrapolate: 'clamp',
                      }),
                      height: animation.interpolate({
                        inputRange: [0, SCROLL_DISTANCE_TRIGGER],
                        outputRange: [64, 32],
                        extrapolate: 'clamp',
                      }),
                      backgroundColor: action.backgroundColor || 'white',
                      ...styles.action,
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
