import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Dot from '~/components/Dot';
import { BorderlessButton } from 'react-native-gesture-handler';

function ScreenHeader({
  heading,
  rightElement,
  activePageIndex = null,
  countPages = null,
  onClose = () => {},
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        {heading &&
          <Text style={styles.heading}>
            {heading}
          </Text>
        }
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

      <View style={styles.iconWrapper}>
        {rightElement ? (
          rightElement
        ) : (
          <BorderlessButton
            onPress={onClose}
          >
            <Ionicons
              name="md-close"
              size={22}
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
    paddingTop: 10,
    paddingBottom: 10,
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
  iconWrapper: {
    position: 'absolute',
    right: 20,
  },
});

export default ScreenHeader;
