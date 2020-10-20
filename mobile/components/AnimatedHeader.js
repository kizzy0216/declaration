import React, { useContext, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { InterfaceContext } from '~/contexts/InterfaceContext';
import ScreenHeader from '~/components/ScreenHeader';
import { BorderlessButton } from 'react-native-gesture-handler';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';

function AnimatedHeader({
  leftElement,
  rightElement,
  heading
}) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(1)).current;
  const headingAnimation = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(headingAnimation, {
      toValue: (theme === 'light' ? 1 : 0),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [theme]);

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
      <View>
        <ScreenHeader
          leftElement={leftElement ? leftElement : (
            <BorderlessButton onPress={() => navigation.goBack()}>
              <ArrowLeftIcon
                width={22}
                height={22}
                fill={
                  headingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#000000', '#FFFFFF'],
                  })
                }
              />
            </BorderlessButton>
          )}
          headingElement={(
            <View style={styles.nameWrapper}>
              <Animated.Text
                style={{
                  ...styles.name,
                  color: headingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#000000', '#FFFFFF'],
                  })
                }}
              >
                {heading || 'POSTS'}
              </Animated.Text>
            </View>
          )}
          rightElement={rightElement ? rightElement : <></>}
        />
      </View>
{/*       
      <AnimatedHeader
        theme={theme}
        leftElement={<></>}
        heading='Some Posts'
      /> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  nameWrapper: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
  iconWrapper: {
    marginLeft: 5,
  },
});

export default AnimatedHeader;
