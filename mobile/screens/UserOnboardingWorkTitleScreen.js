import React, {
  useContext,
  useState,
  useRef,
  useEffect,
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
import { useMutation } from 'urql';
import { StackActions } from '@react-navigation/native';

import UpdateUserProfileWorkTitle from '~/mutations/UpdateUserProfileWorkTitle';
import UserOnboardingFooter from '~/components/UserOnboardingFooter';
import OnboardingHeader from '~/components/OnboardingHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
  IS_IOS,
} from '~/constants';
import { UserContext } from '~/contexts/UserContext';
import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';

function UserOnboardingWorkTitleScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [workTitle, setWorkTitle] = useState(user.profile.workTitle || '');
  const [
    updateWorkTitleResult,
    updateWorkTitle,
  ] = useMutation(UpdateUserProfileWorkTitle);
  const { isKeyboardShowing } = useIsKeyboardShowing();
  const translateYAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: (isKeyboardShowing ? 1 : 0),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardShowing]);

  const handleSubmit = () => {
    if (user.profile.workTitle === workTitle) {
      return navigation.dispatch(
        StackActions.replace('Authentication', {
          screen: 'UserResolution'
        })
      );
    }

    updateWorkTitle({
      uuid: user.profile.uuid,
      work_title: workTitle,
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
      behavior={IS_IOS ? 'padding': 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={styles.safeArea}
        contentContainerStyle={styles.contentContainer}
      >
        <OnboardingHeader
          activePageIndex={4}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          navigation={navigation}
        />
        <Animated.View
          style={{
            ...styles.container,
            transform: [
              {
                translateY: translateYAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -80],
                }),
              },
            ],
          }}
          pointerEvents="box-none"
        >
          <DisplayHeading style={styles.heading}>
            What's your title?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Enter your official title at your workplace to let members know what
            your work generally looks like. Optional.
          </Text>
          <TextInput
            placeholder="Designer, student, etc"
            value={workTitle}
            onChange={setWorkTitle}
          />
        </Animated.View>
        <UserOnboardingFooter
          isFetching={updateWorkTitleResult.fetching}
          onSkip={() =>
            navigation.dispatch(
              StackActions.replace('Authentication', {
                screen: 'UserResolution'
              })
            )
          }
          onNext={handleSubmit}
        />
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
    paddingRight: 30,
    paddingLeft: 30,
  },
  heading: {
    marginBottom: 50,
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 50,
  },
});

export default UserOnboardingWorkTitleScreen;
