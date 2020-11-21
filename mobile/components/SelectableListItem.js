import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import {
  BLUE,
  LIGHT_GRAY,
} from '~/constants';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';

const SelectableListItem = ({
  image,
  heading,
  subHeading,
  action,
  isSelected,
  onPress = () => {},
}) => {
  return (
    <RectButton
      style={styles.selectableListItem}
      onPress={onPress}
    >
      <View style={styles.container}>
        {image &&
          <View style={styles.imageWrapper}>
            {image}
          </View>
        }

        <View style={styles.headings}>
          <View style={styles.headingWrapper}>
            <Text style={styles.heading}>{heading}</Text>
          </View>

          {subHeading &&
            <View style={styles.subHeadingWrapper}>
              <Text style={styles.subHeading}>{subHeading}</Text>
            </View>
          }
        </View>

        <View style={styles.actionWrapper}>
          {action
            ? (
              action
            ) : (
              <View
                style={[
                  styles.actionWrapper,
                  isSelected && styles.actionSelected,
                ]}
              >
                <View style={styles.iconWrapper}>
                  <CheckmarkIcon
                    width={25}
                    height={25}
                    fill="white"
                  />
                </View>
              </View>
            )
          }
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  selectableListItem: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
  actionWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  actionSelected: {
    backgroundColor: BLUE,
    borderWidth: 0
  },
  iconWrapper: {
    padding: 4,
  },
  imageWrapper: {
    paddingRight: 20,
    justifyContent: 'center'
  },
  headings: {
    flex: 1,
  },
  heading: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default SelectableListItem;
