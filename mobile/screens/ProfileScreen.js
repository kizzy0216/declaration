import React, {
  useContext,
  useState,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import EditIcon from 'Shared/components/icons/EditIcon';
import CameraIcon from 'Shared/components/icons/CameraIcon';
import ProfileEditModalContainer from '~/containers/ProfileEditModalContainer';
import NetworkProfileSolutionBioCardContainer from '~/containers/NetworkProfileSolutionBioCardContainer';
import NetworkProfileProblemBioCardContainer from '~/containers/NetworkProfileProblemBioCardContainer';
import ProfileHeader from '~/components/ProfileHeader';
import ProfileSummaryCardContainer from '~/containers/ProfileSummaryCardContainer';
import useProfilePhotoUpload from '~/hooks/useProfilePhotoUpload';
import { UserContext } from '~/contexts/UserContext';
import { NetworkContext } from '~/contexts/NetworkContext';

function ProfileScreen({ navigation }) {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const { user, refresh: refreshUser } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const {
    isFetching: isFetchingPhoto,
    handleInitiation: handleProfilePhotoInitiation,
  } = useProfilePhotoUpload({
    onComplete: refreshUser,
  });

  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

  if (!user) {
    return null;
  }

  return (
    <>
      <ProfileEditModalContainer
        user={user}
        isVisible={isEditModalActive}
        onUpdate={refreshUser}
        onClose={() => setIsEditModalActive(false)}
      />
      <ScreenCard
        uuid={user.uuid}
        headerImageSrc={user.profile.photo}
        renderHeader={({ scrollAnimation }) => (
          <ProfileHeader
            scrollAnimation={scrollAnimation}
            onSettingsPress={() => navigation.navigate('Settings')}
          />
        )}
        stamp="Create positive social impact."
        isFetching={isFetchingPhoto}
        actions={[
          {
            icon: (
              <CameraIcon
                fill="#000"
                width="40%"
                height="40%"
              />
            ),
            onPress: handleProfilePhotoInitiation,
          },
          {
            icon: (
              <EditIcon
                fill="#000"
                width="40%"
                height="40%"
              />
            ),
            onPress: () => setIsEditModalActive(true),
          },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.nameWrapper}>
            <DisplayHeading>
              {user.name}
            </DisplayHeading>
          </View>
          <View style={styles.personalBioWrapper}>
            <PersonalBio
              username={user.profile.username}
              personalBio={user.profile.personalBio}
            />
          </View>
          <View style={styles.row}>
            <ProfileSummaryCardContainer
              user={user}
              isEditable={true}
              onUpdate={refreshUser}
            />
          </View>
          <View style={styles.row}>
            <NetworkProfileProblemBioCardContainer
              user={user}
              network={activeNetwork}
              isEditable={true}
              onUpdate={refreshUser}
            />
          </View>
          <View style={styles.row}>
            <NetworkProfileSolutionBioCardContainer
              user={user}
              network={activeNetwork}
              isEditable={true}
              onUpdate={refreshUser}
            />
          </View>
        </View>
      </ScreenCard>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  nameWrapper: {
    marginBottom: 10,
  },
  personalBioWrapper: {
    marginBottom: 20,
  },
  row: {
    marginBottom: 30,
    overflow: 'visible',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ProfileScreen;
