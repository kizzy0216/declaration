import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { useMutation } from 'urql';

import UpdateUserProfilePhoto from '~/mutations/UpdateUserProfilePhoto';
import ScreenHeader from '~/components/ScreenHeader';
import DisplayHeading from '~/components/DisplayHeading';
import UserOnboardingFooter from '~/components/UserOnboardingFooter';
import Button from '~/components/Button';
import AvatarPicker from '~/components/AvatarPicker';
import {
  COUNT_USER_ONBOARDING_OPTIONAL_PAGES,
  GRAY,
} from '~/constants';
import { UserContext } from '~/contexts/UserContext';
import { fetchREST } from '~/utils/api';
import { IS_IOS } from '~/constants';

const { REST_BASE_URL } = Constants.manifest.extra;

// NOTE:
// Disable Network Inspect in your React Native Debugger
// when uploading photos on this screen
function UserOnboardingPhotoScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [localPhoto, setLocalPhoto] = useState(null);
  const [photo, setPhoto] = useState(user.profile.photo || `${REST_BASE_URL}/avatar/${user.uuid}`);
  const [isFetching, setIsFetching] = useState(false);
  const [
    updatePhotoResult,
    updatePhoto,
  ] = useMutation(UpdateUserProfilePhoto);

  const handleChange = ({ uri }) => {
    setLocalPhoto(uri);
  }

  const handleSubmit = async () => {
    if (!localPhoto || (photo === user.profile.photo)) {
      return navigation.navigate('UserOnboardingLocation');
    }

    setIsFetching(true);

    const uri = localPhoto;
    const type = 'image/jpeg';

    const policyResponse = await fetchREST('/signed-s3-post-policy', {
      method: 'POST',
      body: JSON.stringify({
        contentType: type,
      }),
    });
    const policy = await policyResponse.json();
    const uploadedPhotoUrl = `${policy.url}/${policy.fields.key}`;

    const formData = new FormData();
    formData.append('Content-Type', type);
    Object.entries(policy.fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('file', {
      name: policy.fields.key,
      type,
      uri: (IS_IOS ? uri.replace('file://', '') : uri),
    });

    await fetch(policy.url, {
      method: 'POST',
      body: formData,
    });

    setIsFetching(false);

    await updatePhoto({
      uuid: user.profile.uuid,
      photo: uploadedPhotoUrl,
    }).then(() => {
      navigation.navigate('UserOnboardingLocation');
    });

    setPhoto(photo);
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      contentContainerStyle={styles.contentContainer}
    >
      <ScreenHeader
        activePageIndex={0}
        countPages={COUNT_USER_ONBOARDING_OPTIONAL_PAGES}
        rightElement={<></>}
      />
      <View style={styles.container}>
        <DisplayHeading style={styles.heading}>
          Add your profile photo
        </DisplayHeading>
        <Text style={styles.subHeading}>
          Our networks are built on a strong sense of community, tap the
          default photo below to upload your own.
        </Text>
        <AvatarPicker
          user={user}
          photo={photo}
          onChange={handleChange}
        />
      </View>
      <UserOnboardingFooter
        isFetching={isFetching || updatePhotoResult.fetching}
        onSkip={() => navigation.navigate('UserOnboardingLocation')}
        onNext={handleSubmit}
      />
    </SafeAreaView>
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

export default UserOnboardingPhotoScreen;
