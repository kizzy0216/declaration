import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ArrowRightIcon from '@shared/components/icons/ArrowRightIcon';
import Avatar from '~/components/Avatar';
import {
  BLUE,
  LIGHT_GRAY,
} from '~/constants';

function CallToActionButton({
  heading = '',
  subHeading = '',
  imageSrc,
  actionLabel = '',
  onPress = () => {},
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.callToAction}>
        <View style={styles.left}>
          <Avatar
            imageSrc={imageSrc}
            size="small"
          />
        </View>

        <View style={styles.main}>
          <Text style={styles.heading}>
            {heading}
          </Text>

          {subHeading.length > 0 &&
            <Text style={styles.subHeading}>
              {subHeading}
            </Text>
          }
        </View>

        <View style={styles.right}>
          {actionLabel.length > 0
            ? (
              <View style={styles.action}>
                <Text style={styles.actionLabel}>
                  {actionLabel}
                </Text>
              </View>
            ) : (
              <ArrowRightIcon
                width={22}
                height={22}
                fill="black"
              />
            )
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  callToAction: {
    borderRadius: 17,
    paddingTop: 15,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: LIGHT_GRAY,
  },
  left: {
    paddingTop: 2,
  },
  main: {
    flexGrow: 1,
    paddingLeft: 10,
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
  },
  subHeading: {
    marginTop: 2,
    fontSize: 12,
  },
  action: {
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingTop: 8,
    paddingRight: 10,
    paddingBottom: 8,
    paddingLeft: 10,
  },
  actionLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CallToActionButton;
