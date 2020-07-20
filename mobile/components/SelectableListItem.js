import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Colors from '~/constants/Colors';
import CheckmarkIcon from 'Shared/components/icons/CheckmarkIcon';

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
                    width={16}
                    height={16}
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
    paddingRight: 20,
    paddingLeft: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray,
  },
  actionWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
    overflow: 'hidden',
  },
  actionSelected: {
    backgroundColor: Colors.blue,
  },
  iconWrapper: {
    padding: 4,
  },
  imageWrapper: {
    paddingRight: 10,
  },
  headings: {
    flex: 1,
  },
  heading: {
    textAlign: 'left',
  },
});

export default SelectableListItem;
