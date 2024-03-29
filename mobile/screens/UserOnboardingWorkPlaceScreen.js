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

import UpdateUserProfileWorkPlace from '~/mutations/UpdateUserProfileWorkPlace';
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

function UserOnboardingWorkPlaceScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [workPlace, setWorkPlace] = useState(user.profile.workPlace || '');
  const [
    updateWorkPlaceResult,
    updateWorkPlace,
  ] = useMutation(UpdateUserProfileWorkPlace);
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
    if (user.profile.workPlace === workPlace) {
      return navigation.navigate('UserOnboardingWorkTitle');
    }

    updateWorkPlace({
      uuid: user.profile.uuid,
      work_place: workPlace,
    }).then(() => {
      navigation.navigate('UserOnboardingWorkTitle');
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
          activePageIndex={3}
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
            Where do you work?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Put your work into context by providing your workplace.
            Optional.
          </Text>
          <TextInput
            placeholder="Company name"
            value={workPlace}
            onChange={setWorkPlace}
          />
        </Animated.View>
        <UserOnboardingFooter
          isFetching={updateWorkPlaceResult.fetching}
          onSkip={() => navigation.navigate('UserOnboardingWorkTitle')}
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

export default UserOnboardingWorkPlaceScreen;
