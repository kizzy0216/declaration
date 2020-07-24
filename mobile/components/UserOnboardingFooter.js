import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Button from '~/components/Button';

const UserOnboardingFooter = ({
  isFetching = false,
  onNext = () => {},
  onSkip = () => {},
}) => {
  return (
    <View style={styles.footer}>
      <View style={[styles.buttonWrapper, styles.skipButton]}>
        <Button
          label="Skip"
          theme="transparent"
          onPress={onSkip}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="Next"
          isFetching={isFetching}
          onPress={onNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flexBasis: '50%',
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default UserOnboardingFooter;
