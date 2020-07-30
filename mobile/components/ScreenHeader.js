import React, { useContext } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

import Dot from '~/components/Dot';
import { BorderlessButton } from 'react-native-gesture-handler';
import CloseIcon from 'Shared/components/icons/CloseIcon';

function ScreenHeader({
  heading,
  headingElement,
  headingStyle,
  leftElement,
  rightElement,
  activePageIndex = null,
  countPages = null,
  onClose = () => {},
}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {leftElement && leftElement}
      </View>

      <View style={styles.headingWrapper}>
        {heading &&
          <Animated.Text style={[styles.heading, headingStyle]}>
            {heading}
          </Animated.Text>
        }
        {headingElement && headingElement}
        {activePageIndex !== null && countPages !== null &&
          <View style={styles.dotsWrapper}>
            {Array.from(Array(countPages).keys()).map((index) => (
              <Dot
                key={index}
                style={styles.dot}
                isActive={activePageIndex === index}
              />
            ))}
          </View>
        }
      </View>

      <View style={styles.right}>
        {rightElement ? (
          rightElement
        ) : (
          <BorderlessButton onPress={onClose}>
            <CloseIcon
              width={22}
              height={22}
              fill="black"
            />
          </BorderlessButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headingWrapper: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    marginRight: 5,
  },
  left: {
    position: 'absolute',
    left: 30,
    zIndex: 1,
  },
  right: {
    position: 'absolute',
    right: 30,
    zIndex: 1,
  },
});

export default ScreenHeader;
