import React, {
  useContext,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from '~/components/ProfileHeader';
import { UserContext } from '~/contexts/UserContext';
import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import ProfileSummaryCard from '~/components/ProfileSummaryCard';
import ProfileSectionCard from '~/components/ProfileSectionCard';
import ProfileEditModal from '~/components/ProfileEditModal';
import ProfileLocationEditModal from '~/components/ProfileLocationEditModal';
import ProfileWorkEditModal from '~/components/ProfileWorkEditModal';
import ProfileEducationEditModal from '~/components/ProfileEducationEditModal';
import ProfileProblemBioEditModal from '~/components/ProfileProblemBioEditModal';
import ProfileSolutionBioEditModal from '~/components/ProfileSolutionBioEditModal';
import EditIcon from 'Shared/components/icons/EditIcon';
import CameraIcon from 'Shared/components/icons/CameraIcon';

function ProfileScreen({ navigation }) {
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isEditLocationModalActive, setIsEditLocationModalActive] = useState(false);
  const [isEditWorkModalActive, setIsEditWorkModalActive] = useState(false);
  const [isEditEducationModalActive, setIsEditEducationModalActive] = useState(false);
  const [isEditProblemBioModalActive, setIsEditProblemBioModalActive] = useState(false);
  const [isEditSolutionBioModalActive, setIsEditSolutionBioModalActive] = useState(false);
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <ProfileEditModal
        user={user}
        isVisible={isEditModalActive}
        onClose={() => setIsEditModalActive(false)}
      />
      <ProfileLocationEditModal
        user={user}
        isVisible={isEditLocationModalActive}
        onClose={() => setIsEditLocationModalActive(false)}
      />
      <ProfileWorkEditModal
        user={user}
        isVisible={isEditWorkModalActive}
        onClose={() => setIsEditWorkModalActive(false)}
      />
      <ProfileEducationEditModal
        user={user}
        isVisible={isEditEducationModalActive}
        onClose={() => setIsEditEducationModalActive(false)}
      />
      <ProfileProblemBioEditModal
        user={user}
        isVisible={isEditProblemBioModalActive}
        onClose={() => setIsEditProblemBioModalActive(false)}
      />
      <ProfileSolutionBioEditModal
        user={user}
        isVisible={isEditSolutionBioModalActive}
        onClose={() => setIsEditSolutionBioModalActive(false)}
      />
      <ScreenCard
        uuid={user.uuid}
        headerImageSrc={user.profile.photo}
        header={(
          <ProfileHeader
            onSettingsPress={() => navigation.navigate('Settings')}
          />
        )}
        stamp="Create positive social impact."
        actions={[
          {
            icon: (
              <CameraIcon
                fill="#000"
                width="40%"
                height="40%"
              />
            ),
            onPress: () => {},
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
            <ProfileSummaryCard
              profile={user.profile}
              isEditable={true}
              onEditLocation={() => setIsEditLocationModalActive(true)}
              onEditWork={() => setIsEditWorkModalActive(true)}
              onEditEducation={() => setIsEditEducationModalActive(true)}
            />
          </View>
          <View style={styles.row}>
            <ProfileSectionCard
              heading={('The one thing I\ncan help you with is')}
              isEditable={true}
              onPress={() => setIsEditSolutionBioModalActive(true)}
            >
              <Text style={styles.paragraph}>
                Vestibulum sagittis sem id metus elin eleifend massa viverra.
                Suspendisse consequat nunc id commodo auctor.
              </Text>
            </ProfileSectionCard>
          </View>
          <View style={styles.row}>
            <ProfileSectionCard
              heading={('The one thing I\nneed help with is')}
              isEditable={true}
              onPress={() => setIsEditProblemBioModalActive(true)}
            >
              <Text style={styles.paragraph}>
                Vestibulum sagittis sem id metus elin eleifend massa viverra.
                Suspendisse consequat nunc id commodo auctor.
              </Text>
            </ProfileSectionCard>
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
