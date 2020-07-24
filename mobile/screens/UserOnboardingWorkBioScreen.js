import React, {
  useRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import { useMutation } from 'urql';

import UpdateUserProfileWorkBio from '~/mutations/UpdateUserProfileWorkBio';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
  IS_IOS,
} from '~/constants';
import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';
import { UserContext } from '~/contexts/UserContext';

function UserOnboardingWorkBioScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [workBio, setWorkBio] = useState(user.profile.workBio || '');
  const [
    updateWorkBioResult,
    updateWorkBio,
  ] = useMutation(UpdateUserProfileWorkBio);

  const isKeyboardShowing = useIsKeyboardShowing();
  const translateYAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: (isKeyboardShowing ? 1 : 0),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardShowing]);

  const handleSubmit = () => {
    if (user.profile.workBio === workBio) {
      return navigation.dispatch(
        StackActions.replace('Authentication', {
          screen: 'UserResolution'
        })
      );
    }

    updateWorkBio({
      uuid: user.profile.uuid,
      work_bio: workBio,
    }).then(() => {
      navigation.dispatch(
        StackActions.replace('Authentication', {
          screen: 'UserResolution'
        })
      )
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <ScreenHeader
          activePageIndex={6}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <View style={styles.container}>
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateY: translateYAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90],
                  }),
                },
              ],
            }}
          >
            <DisplayHeading style={styles.heading}>
              Tell us more about your work.
            </DisplayHeading>
            <Text style={styles.subHeading}>
              Include skills and aspirations such that members can 
              support you and vice versa. Optional.
            </Text>
            <TextInput
              placeholder="Work bio"
              multiline={true}
              minHeight={100}
              maxHeight={150}
              value={workBio}
              onChange={setWorkBio}
            />
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <View style={[styles.buttonWrapper, styles.skipButton]}>
            <Button
              label="Skip"
              theme="secondary"
              onPress={() =>
                navigation.dispatch(
                  StackActions.popToTop()
                )
              }
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              label="Next"
              isFetching={updateWorkBioResult.fetching}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingTop: 100,
    paddingRight: 20,
    paddingLeft: 20,
  },
  heading: {
    width: 300,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
    color: GRAY,
  },
  footer: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  buttonWrapper: {
    flexBasis: '50%',
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default UserOnboardingWorkBioScreen;
