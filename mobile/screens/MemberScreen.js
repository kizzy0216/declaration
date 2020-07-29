import React, {
  useContext,
  useState,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setStatusBarStyle } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useMutation } from 'urql';

import GetUser from '~/queries/GetUser';
import GetNetworkUserRelationship from '~/queries/GetNetworkUserRelationship';
import InsertNetworkUserRelationship from '~/mutations/InsertNetworkUserRelationship';
import UpdateNetworkUserRelationship from '~/mutations/UpdateNetworkUserRelationship';
import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import EditIcon from 'Shared/components/icons/EditIcon';
import CameraIcon from 'Shared/components/icons/CameraIcon';
import PlusIcon from 'Shared/components/icons/PlusIcon';
import CheckmarkIcon from 'Shared/components/icons/CheckmarkIcon';
import DoubleConfirmModal from '~/components/DoubleConfirmModal';
import ChoiceModal from '~/components/ChoiceModal';
import NetworkProfileSolutionBioCardContainer from '~/containers/NetworkProfileSolutionBioCardContainer';
import NetworkProfileProblemBioCardContainer from '~/containers/NetworkProfileProblemBioCardContainer';
import ProfileHeader from '~/components/ProfileHeader';
import ProfileSummaryCardContainer from '~/containers/ProfileSummaryCardContainer';
import { UserContext } from '~/contexts/UserContext';
import { NetworkContext } from '~/contexts/NetworkContext';
import mapUser from 'Shared/mappings/mapUser';
import {
  CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE,
  PENDING_NETWORK_USER_RELATIONSHIP_TYPE,
  DECLINED_NETWORK_USER_RELATIONSHIP_TYPE,
} from 'Shared/constants';
import mapNetworkUserRelationship from 'Shared/mappings/mapNetworkUserRelationship';
import { BLUE } from '~/constants';

function MemberScreen({ navigation, route }) {
  const { uuid } = route.params;

  if (!uuid) {
    return null;
  }

  const [
    isDoubleConfirmConnectionModalActive, 
    setIsDoubleConfirmConnectionModalActive,
  ] = useState(false);
  const [
    isDoubleConfirmDisconnectionModalActive, 
    setIsDoubleConfirmDisconnectionModalActive,
  ] = useState(false);
  const [
    isChoiceModalActive, 
    setIsChoiceModalActive,
  ] = useState(false);
  const {
    user: authenticatedUser,
    isAuthenticated,
  } = useContext(UserContext);
  const { activeNetwork } = useContext(NetworkContext);

  const [
    insertRelationshipResult,
    insertRelationship,
  ] = useMutation(InsertNetworkUserRelationship);
  const [
    updateRelationshipResult,
    updateRelationship,
  ] = useMutation(UpdateNetworkUserRelationship);
  const [
    getUserResult,
    getUser,
  ] = useQuery({
    query: GetUser,
    variables: {
      uuid,
    },
    pause: !uuid,
    requestPolicy: 'cache-and-network',
  });
  const [
    getRelationshipResult,
    getRelationship,
  ] = useQuery({
    query: GetNetworkUserRelationship,
    variables: {
      network_uuid: activeNetwork.uuid,
      authenticated_user_uuid: authenticatedUser.uuid,
      user_uuid: uuid,
    },
    pause: (!uuid || !activeNetwork || !authenticatedUser),
    requestPolicy: 'cache-and-network',
  });

  useFocusEffect(useCallback(() => {
    setStatusBarStyle('light');
    return () => {
      setStatusBarStyle('dark');
    }
  }));

  let user;
  let relationship;

  function handleRequestConnection() {
    insertRelationship({
      from_user_uuid: authenticatedUser.uuid,
      to_user_uuid: user.uuid,
      network_uuid: activeNetwork.uuid,
      type: PENDING_NETWORK_USER_RELATIONSHIP_TYPE,
    }).then(() => {
      setIsDoubleConfirmConnectionModalActive(false);
      getRelationship({ requestPolicy: 'network-only' });
    });
  }

  function handleDisconnect() {
    updateRelationship({
      uuid: relationship.from.uuid || relationship.to.uuid,
      type: DECLINED_NETWORK_USER_RELATIONSHIP_TYPE,
    }).then(() => {
      setIsDoubleConfirmDisconnectionModalActive(false);
      getRelationship({ requestPolicy: 'network-only' });
    });
  }

  function handleAcceptConnection() {
    updateRelationship({
      uuid: relationship.to.uuid || relationship.from.uuid,
      type: CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE,
    }).then(() => {
      setIsChoiceModalActive(false);
      getRelationship({ requestPolicy: 'network-only' });
    });
  }

  function handleDeclineConnection() {
    updateRelationship({
      uuid: relationship.to.uuid || relationship.from.uuid,
      type: DECLINED_NETWORK_USER_RELATIONSHIP_TYPE,
    }).then(() => {
      setIsChoiceModalActive(false);
      getRelationship({ requestPolicy: 'network-only' });
    });
  }

  if (!getUserResult.fetching && getUserResult.data) {
    user = mapUser(getUserResult.data.user_by_pk);
  }

  if (!getRelationshipResult.fetching && getRelationshipResult.data) {
    relationship = mapNetworkUserRelationship(
      getRelationshipResult
        .data
        .network_user_by_pk
        .user
    );
  }

  const actions = [
    (
      !relationship ||
      (
        !relationship.from.uuid &&
        !relationship.to.uuid
      )
    ) && ({
      icon: (
        <PlusIcon
          fill="white"
          width="40%"
          height="40%"
        />
      ),
      style: {
        backgroundColor: BLUE,
      },
      onPress: () => setIsDoubleConfirmConnectionModalActive(true),
    }),
    (
      relationship &&
      (
        (relationship.from.type === CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE) ||
        (relationship.to.type === CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE)
      )
    ) && ({
      icon: (
        <CheckmarkIcon
          fill="#000"
          width="40%"
          height="40%"
        />
      ),
      onPress: () => setIsDoubleConfirmDisconnectionModalActive(true),
    }),
    (
      relationship &&
      (
        (relationship.from.type === PENDING_NETWORK_USER_RELATIONSHIP_TYPE)
      )
    ) && ({
      icon: (
        <CheckmarkIcon
          fill="white"
          width="40%"
          height="40%"
        />
      ),
      style: {
        backgroundColor: BLUE,
      },
      onPress: () => setIsChoiceModalActive(true),
    }),
  ].filter(x => x);

  if (!user) {
    return null;
  }

  return (
    <>
      <DoubleConfirmModal
        heading="Are you sure you want to send a connection request?"
        submitLabel="Yes, send connection request"
        cancelLabel="No, cancel"
        isVisible={isDoubleConfirmConnectionModalActive}
        onSubmit={handleRequestConnection}
        onCancel={() => setIsDoubleConfirmConnectionModalActive(false)}
      />
      <DoubleConfirmModal
        heading="Are you sure you want to disconnect?"
        submitLabel="Yes, disconnect"
        cancelLabel="No, cancel"
        isVisible={isDoubleConfirmDisconnectionModalActive}
        onSubmit={handleDisconnect}
        onCancel={() => setIsDoubleConfirmDisconnectionModalActive(false)}
      />
      <ChoiceModal
        heading="Do you approve this connection?"
        acceptLabel="Yes, let's connect"
        declineLabel="No, decline"
        isVisible={isChoiceModalActive}
        onAccept={handleAcceptConnection}
        onDecline={handleDeclineConnection}
        onCancel={() => setIsChoiceModalActive(false)}
      />
      <ScreenCard
        uuid={user.uuid}
        headerImageSrc={user.profile.photo}
        renderHeader={({ scrollAnimation }) => (
          <ProfileHeader
            user={user}
            scrollAnimation={scrollAnimation}
            showSettings={false}
          />
        )}
        stamp="Create positive social impact."
        actions={actions}
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
              isEditable={false}
            />
          </View>
          <View style={styles.row}>
            <NetworkProfileProblemBioCardContainer
              user={user}
              network={activeNetwork}
              isEditable={false}
            />
          </View>
          <View style={styles.row}>
            <NetworkProfileSolutionBioCardContainer
              user={user}
              network={activeNetwork}
              isEditable={false}
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

export default MemberScreen;
