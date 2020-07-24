import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useQuery,
  useMutation,
} from 'urql';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import DisplayHeading from '~/components/DisplayHeading';
import NetworkMembershipRequestForm from '~/components/NetworkMembershipRequestForm';
import GetNetworkByUuid from '~/queries/GetNetworkByUuid';
import InsertNetworkMembershipRequestOne from '~/mutations/InsertNetworkMembershipRequestOne';
import { UserContext } from '~/contexts/UserContext';
import { IS_IOS } from '~/constants';
import useIsKeyboardShowing from '~/hooks/useIsKeyboardShowing';

function NetworkMembershipRequestScreen({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { params = {} } = route;
  const [getNetworkResult] = useQuery({
    query: GetNetworkByUuid,
    variables: {
      uuid: params.networkUuid,
    },
  });
  const [response, insertMembershipRequest] = useMutation(InsertNetworkMembershipRequestOne);

  const isKeyboardShowing = useIsKeyboardShowing();
  const translateYAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateYAnimation, {
      toValue: (isKeyboardShowing ? 1 : 0),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardShowing]);

  function handleSubmit({ body }) {
    insertMembershipRequest({
      network_uuid: params.networkUuid,
      user_uuid: user.uuid,
      body,
    }).then(() => {
      navigation.dispatch(
        StackActions.replace('NetworkMembershipRequestFeedback')
      )
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateY: translateYAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
          }}
        >
          <DisplayHeading style={styles.heading}>
            Unfortunately you're not on our invite list.
          </DisplayHeading>

          <Text style={styles.subHeading}>
            Fill out the fields below and we will send a request to that network
            admin letting them know you want to join.
          </Text>

          <NetworkMembershipRequestForm onSubmit={handleSubmit} />
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    paddingTop: 50,
    width: 300,
  },
  subHeading: {
    fontSize: 16,
    lineHeight: 24,
    width: 315,
    marginBottom: 50,
  },
});

export default NetworkMembershipRequestScreen;
