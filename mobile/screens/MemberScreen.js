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
import { useQuery, useMutation } from 'urql';

import GetUser from '~/queries/GetUser';
import GetNetworkUserRelationship from '~/queries/GetNetworkUserRelationship';
import InsertNetworkUserRelationship from '~/mutations/InsertNetworkUserRelationship';
import UpdateNetworkUserRelationship from '~/mutations/UpdateNetworkUserRelationship';
import ScreenCard from '~/components/ScreenCard';
import DisplayHeading from '~/components/DisplayHeading';
import PersonalBio from '~/components/PersonalBio';
import PlusIcon from '@shared/components/icons/PlusIcon';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';
import DoubleConfirmModal from '~/components/DoubleConfirmModal';
import ChoiceModal from '~/components/ChoiceModal';
import NetworkProfileSolutionBioCardContainer from '~/containers/NetworkProfileSolutionBioCardContainer';
import NetworkProfileProblemBioCardContainer from '~/containers/NetworkProfileProblemBioCardContainer';
import ProfileHeader from '~/components/ProfileHeader';
import ProfileSummaryCardContainer from '~/containers/ProfileSummaryCardContainer';
import { UserContext } from '~/contexts/UserContext';
import { NetworkContext } from '~/contexts/NetworkContext';
import mapUser from '@shared/mappings/mapUser';
import {
  CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE,
  PENDING_NETWORK_USER_RELATIONSHIP_TYPE,
  DECLINED_NETWORK_USER_RELATIONSHIP_TYPE,
} from '@shared/constants';
import mapNetworkUserRelationship from '@shared/mappings/mapNetworkUserRelationship';
import ProfileTabBar from '../components/ProfileTabBar';
import UserContentList from '../components/UserContentList';
import { BLACK, BLUE, WINDOW_HEIGHT } from '~/constants';
import PersonIcon from '@shared/components/icons/PersonIcon';
import PostsIcon from '@shared/components/icons/PostsIcon';
import PostsEmptyIcon from '@shared/components/icons/PostsEmptyIcon';
import HeartOutlineIcon from '@shared/components/icons/HeartOutlineIcon';
import HeartEmptyIcon from '@shared/components/icons/HeartEmptyIcon';
import NewCommentIcon from '@shared/components/icons/NewCommentIcon'
import { MessageContext } from '../contexts/MessageContext';
import InsertConversation from '../mutations/InsertConversation'

function MemberScreen({ navigation, route }) {
  const { uuid } = route.params;

  if (!uuid) {
    return null;
  }

  const [activeIndex, setActiveIndex] = React.useState(0)
  const memberTabItems = React.useMemo(() => [
      { id: 'about', title: 'About', icon: <PersonIcon width={24} height={24} viewBox="0 0 24 24" fill={BLACK} style={{marginTop: 2}} /> },
      { id: 'posts', title: 'Posts', icon: <PostsIcon width={24} height={24} viewBox="0 0 20 22" fill={BLACK} style={{marginTop: 4}} /> },
      { id: 'Likes', title: 'Likes', icon: <HeartOutlineIcon width={24} height={24} viewBox="0 0 23 24" fill={BLACK} style={{marginTop: 4.6, marginLeft: -2}} /> },
  ], []);

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
  const { conversations } = useContext(MessageContext);

  const [_, insertConversation] = useMutation(InsertConversation);

  const [
    insertRelationshipResult,
    insertRelationship,
  ] = useMutation(InsertNetworkUserRelationship);
  const [
    updateRelationshipResult,
    updateRelationship,
  ] = useMutation(UpdateNetworkUserRelationship);
  // TODO combine the two following queries into one; GetUserWithRelationships
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
      type: CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE, // TODO: BACK TO PENDING WHEN INVITE IS REQUIRED; there was also a permission check on DB
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

  function handleMessageClick () {
    const existingConvo = uuid && conversations ? conversations.find(x => x.conversation_users.length === 1 && x.conversation_users[0].user_uuid === uuid) : null
    if (existingConvo) {
      navigation.navigate('ChatScreen', { conversation_uuid: existingConvo.uuid, goBack: true })
    }
    else {
      const variables = { 
          network_uuid: activeNetwork.uuid,  
          user_data: [{ user_uuid: uuid}, {user_uuid: authenticatedUser.uuid}],
      }
      insertConversation(variables).then(result => {
          if (result.error) { 
              console.error('CONVO INSERT ISSUE', result.error) 
          } else {
              navigation.navigate('ChatScreen', { conversation_uuid: result.data.insert_conversation_one.uuid, goBack: true })
          }
      })
    }
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
      onPress: () => handleRequestConnection(),
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
    // Direct Message Button (DM)
    (
      relationship &&
      (
        (relationship.from.type === CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE) ||
        (relationship.to.type === CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE)
      )
    ) && ({
      icon: (
        <NewCommentIcon
          fill="#000"
        />
      ),
      onPress: () => handleMessageClick(), 
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
        heading={`Want to connect with ${user.name}?`}
        subHeading="The feeling has to be mutual. We'll send a request on your behalf to elevate each other's contributions to the network and allow direct communication."
        submitLabel="Yes, send connection request"
        cancelLabel="No, cancel"
        isVisible={isDoubleConfirmConnectionModalActive}
        onSubmit={handleRequestConnection}
        onCancel={() => setIsDoubleConfirmConnectionModalActive(false)}
      />
      <DoubleConfirmModal
        heading={`Disconnect from ${user.name}?`}
        subHeading="Communication between you and them will be limited, as well as contributions to the network."
        submitLabel="Yes, disconnect"
        cancelLabel="No, cancel"
        isVisible={isDoubleConfirmDisconnectionModalActive}
        onSubmit={handleDisconnect}
        onCancel={() => setIsDoubleConfirmDisconnectionModalActive(false)}
      />
      <ChoiceModal
        heading={`Want to connect with ${user.name}?`}
        subHeading="Direct communication between you and them will be enabled, and each other's contributions to the network will be elevated."
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
            showClose={true}
            onClose={() => navigation.goBack()}
          />
        )}
        actions={actions}
      >
        <View style={styles.container}>
          <View style={styles.nameWrapper}>
            <DisplayHeading size="large">
              {`${user.name.split(' ').join('\n')}`}
            </DisplayHeading>
          </View>
          <View style={styles.personalBioWrapper}>
            <PersonalBio
              username={user.profile.username}
              personalBio={user.profile.personalBio}
            />
          </View>
          <View style={{marginVertical: 30}}>
            <ProfileTabBar
              tabList={memberTabItems}
              activeIndex={activeIndex}
              onChangeIndex={setActiveIndex}
            />
          </View>
          <View style={{flex: 1, minHeight: (WINDOW_HEIGHT * 0.6) }}>
            <View style={{display: activeIndex === 0 ? 'flex' : 'none'}}>
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
            <View style={{display: activeIndex === 1 ? 'flex' : 'none'}}>
              <UserContentList
                user={user}
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
                astronomer={user}
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
