import React, {
  useContext,
  useState,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
// import { useQuery, useMutation } from 'urql';

// import GetUser from '~/queries/GetUser';
import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import EditIcon from '@shared/components/icons/EditIcon';
import CameraIcon from '@shared/components/icons/CameraIcon';
import ProfileEditModalContainer from '~/containers/ProfileEditModalContainer';
import NetworkProfileSolutionBioCardContainer from '~/containers/NetworkProfileSolutionBioCardContainer';
import NetworkProfileProblemBioCardContainer from '~/containers/NetworkProfileProblemBioCardContainer';
import ProfileHeader from '~/components/ProfileHeader';
import ProfileSummaryCardContainer from '~/containers/ProfileSummaryCardContainer';
import useProfilePhotoUpload from '~/hooks/useProfilePhotoUpload';
import { UserContext } from '~/contexts/UserContext';
import { NetworkContext } from '~/contexts/NetworkContext';
import ProfileTabBar from '../components/ProfileTabBar';
import UserContentList from '../components/UserContentList';
import { BLACK, WINDOW_HEIGHT } from '~/constants';
import PersonIcon from '@shared/components/icons/PersonIcon';
import PostsIcon from '@shared/components/icons/PostsIcon';
import PostsEmptyIcon from '@shared/components/icons/PostsEmptyIcon';
import HeartOutlineIcon from '@shared/components/icons/HeartOutlineIcon';
import HeartEmptyIcon from '@shared/components/icons/HeartEmptyIcon';
function ProfileScreen({ navigation }) {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0)
  const profileTabItems = React.useMemo(() => [
      { id: 'about', title: 'About', icon: <PersonIcon width={24} height={24} viewBox="0 0 24 24" fill={BLACK} style={{marginTop: 2}} /> },
      { id: 'posts', title: 'Posts', icon: <PostsIcon width={24} height={24} viewBox="0 0 20 22" fill={BLACK} style={{marginTop: 4}} /> },
      { id: 'Likes', title: 'Likes', icon: <HeartOutlineIcon width={24} height={24} viewBox="0 0 23 24" fill={BLACK} style={{marginTop: 4.6, marginLeft: -2}} /> },
  ], []);
  const {
    user: authenticatedUser,
    refresh: refreshAuthenticatedUser,
    isAuthenticated,
  } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);
  const {
    isFetching: isFetchingPhoto,
    handleInitiation: handleProfilePhotoInitiation,
  } = useProfilePhotoUpload({
    onComplete: refreshAuthenticatedUser,
  });

  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

  const actions = [
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
  ];

  if (!authenticatedUser || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <ProfileEditModalContainer
        user={authenticatedUser}
        isVisible={isEditModalActive}
        onUpdate={refreshAuthenticatedUser}
        onClose={() => setIsEditModalActive(false)}
      />
      <ScreenCard
        uuid={authenticatedUser.uuid}
        headerImageSrc={authenticatedUser.profile.photo}
        renderHeader={({ scrollAnimation }) => (
          <ProfileHeader
            user={authenticatedUser}
            scrollAnimation={scrollAnimation}
            showSettings={true}
            onSettingsPress={() => navigation.navigate('Settings')}
          />
        )}
        stamp="Create positive social impact."
        isFetching={isFetchingPhoto}
        actions={actions}
      >
        <View style={styles.container}>
          <View style={styles.nameWrapper}>
            <DisplayHeading size="large">
              {`${authenticatedUser.name.split(' ').join('\n')}`}
            </DisplayHeading>
          </View>
          <View style={styles.personalBioWrapper}>
            <PersonalBio
              username={authenticatedUser.profile.username}
              personalBio={authenticatedUser.profile.personalBio}
            />
          </View>
          <View style={{marginVertical: 30}}>
            <ProfileTabBar
              tabList={profileTabItems}
              activeIndex={activeIndex}
              onChangeIndex={setActiveIndex}
            />
          </View>
          <View style={{flex: 1, minHeight: (WINDOW_HEIGHT * 0.6) }}>
            <View style={{display: activeIndex === 0 ? 'flex' : 'none'}}>
              <View style={styles.row}>
                <ProfileSummaryCardContainer
                  user={authenticatedUser}
                  isEditable={true}
                  onUpdate={refreshAuthenticatedUser}
                />
              </View>
              <View style={styles.row}>
                <NetworkProfileProblemBioCardContainer
                  user={authenticatedUser}
                  network={activeNetwork}
                  isEditable={true}
                  onUpdate={refreshAuthenticatedUser}
                />
              </View>
              <View style={styles.row}>
                <NetworkProfileSolutionBioCardContainer
                  user={authenticatedUser}
                  network={activeNetwork}
                  isEditable={true}
                  onUpdate={refreshAuthenticatedUser}
                />
              </View>
            </View>
            <View style={{display: activeIndex === 1 ? 'flex' : 'none'}}>
              <UserContentList
                user={authenticatedUser}
                emptyComponent={
                  <View style={{width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <PostsEmptyIcon style={{marginTop: 40, marginBottom: 8}} />
                    <Text>No posts added to the network yet</Text>
                  </View>
                }
              />
            </View>
            <View style={{display: activeIndex === 2 ? 'flex' : 'none'}}>
              <UserContentList
                astronomer={authenticatedUser}
                emptyComponent={
                  <View style={{width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <HeartEmptyIcon style={{marginTop: 40, marginBottom: 8}} />
                    <Text>You haven't liked any posts yet</Text>
                  </View>
                }
              />
            </View>
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
    marginBottom: 30,
  },
  row: {
    marginBottom: 30,
    overflow: 'visible',
  },
});

export default ProfileScreen;
