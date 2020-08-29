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
import { useMutation } from 'urql';

import UpdateUserProfilePersonalBio from '~/mutations/UpdateUserProfilePersonalBio';
import UserOnboardingFooter from '~/components/UserOnboardingFooter';
import ScreenHeader from '~/components/ScreenHeader';
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

function UserOnboardingPersonalBioScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [personalBio, setPersonalBio] = useState(user.profile.personalBio || '');
  const { isKeyboardShowing } = useIsKeyboardShowing();
  const translateYAnimation = useRef(new Animated.Value(0)).current;
  const [
    updatePersonalBioResult,
    updatePersonalBio,
  ] = useMutation(UpdateUserProfilePersonalBio);

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: (isKeyboardShowing ? 1 : 0),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardShowing]);

  const handleSubmit = () => {
    if (user.profile.personalBio === personalBio) {
      return navigation.navigate('UserOnboardingEducationalInstitution');
    }

    updatePersonalBio({
      uuid: user.profile.uuid,
      personal_bio: personalBio,
    }).then(() => {
      navigation.navigate('UserOnboardingEducationalInstitution');
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
          activePageIndex={2}
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
              Tell us more about yourself.
            </DisplayHeading>
            <Text style={styles.subHeading}>
              Include your hobbies and interests so that other members get a better
              idea of who you are. Optional.
            </Text>
            <TextInput
              placeholder="Personal bio"
              multiline={true}
              minHeight={100}
              maxHeight={150}
              value={personalBio}
              onChange={setPersonalBio}
            />
          </Animated.View>
        </View>
        <UserOnboardingFooter
          isFetching={updatePersonalBioResult.fetching}
          onSkip={() => navigation.navigate('UserOnboardingEducationalInstitution')}
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
    paddingRight: 20,
    paddingLeft: 20,
  },
  collapseTop: {
    paddingTop: 10,
  },
  heading: {
    width: 250,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
    color: GRAY,
  },
});

export default UserOnboardingPersonalBioScreen;
