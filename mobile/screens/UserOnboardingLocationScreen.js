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

import UpdateUserProfileLocation from '~/mutations/UpdateUserProfileLocation';
import UserOnboardingFooter from '~/components/UserOnboardingFooter';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import Button from '~/components/Button';
import LocationInputContainer from '~/containers/LocationInputContainer';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
  IS_IOS,
} from '~/constants';
import { UserContext } from '~/contexts/UserContext';
import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';

function UserOnboardingLocationScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(user.profile.location || '');
  const [place, setPlace] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [
    updateLocationResult,
    updateLocation,
  ] = useMutation(UpdateUserProfileLocation);
  const { isKeyboardShowing } = useIsKeyboardShowing();
  const translateYAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: (isKeyboardShowing ? 1 : 0),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardShowing]);

  function handleSubmit () {
    if (user.profile.location === location) {
      return navigation.navigate('UserOnboardingEducationalInstitution');
    }

    updateLocation({
      uuid: user.profile.uuid,
      location,
      location_latitude_longitude: `(${place.latitudeLongitude.join(',')})`,
    }).then(() => {
      navigation.navigate('UserOnboardingEducationalInstitution');
    });
  }

  function handleChange({
    location,
    place,
    isFetching,
    isInvalid,
  }) {
    setLocation(location);
    setPlace(place);
    setIsFetching(isFetching);
    setIsDisabled(isInvalid);
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
          activePageIndex={1}
          countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
          rightElement={<></>}
        />
        <Animated.View
          style={{
            ...styles.container,
            transform: [
              {
                translateY: translateYAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -50],
                }),
              },
            ],
          }}
        >
          <DisplayHeading style={styles.heading}>
            Where do you live currently?
          </DisplayHeading>
          <Text style={styles.subHeading}>
            Your rough location may be used by members seeking support by
            those geographically close to them. Optional.
          </Text>
          <LocationInputContainer
            types="(regions)"
            placeholder="City, State"
            initialLocation={location}
            onChange={handleChange}
          />
        </Animated.View>
        <UserOnboardingFooter
          isFetching={updateLocationResult.fetching || isFetching}
          isDisabled={isDisabled}
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
  heading: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
    color: GRAY,
  },
});

export default UserOnboardingLocationScreen;
