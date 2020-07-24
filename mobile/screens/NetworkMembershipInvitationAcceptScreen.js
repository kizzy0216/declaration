import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import SpinnerIcon from 'Shared/components/icons/SpinnerIcon';
import { UserContext } from '~/contexts/UserContext';
import { fetchREST } from '~/utils/api';

function NetworkMembershipInvitationAcceptScreen({ route, navigation }) {
  const [status, setStatus] = useState(0);
  const { logIn, user } = useContext(UserContext);
  const { params = {} } = route;
  const {
    email,
    code,
  } = params;

  useEffect(() => {
    if (email && code) {
      fetchREST('/accept-invitation', {
        method: 'POST',
        body: JSON.stringify({
          email,
          code,
          withCookies: false,
        }),
      }).then(async (response) => {
        const {
          uuid,
          roles,
          jwt,
        } = await response.json();

        setStatus(response.status);
        if (
          response.status === 404 ||
          response.status === 400 ||
          response.status === 200
        ) {
          setTimeout(() => {
            navigation.dispatch(
              StackActions.replace('Authentication')
            );
          }, 5000);
        } else if (response.status === 201) {
          logIn({
            jwt,
            user: {
              uuid,
              roles,
            },
          });

          setTimeout(() => {
            navigation.dispatch(
              StackActions.replace('Authentication')
            );
          }, 5000);
        }
      }).catch((error) => {
        console.log('error');
        console.error(error);
      });
    } else {
      setStatus('Email and invitation code not found');
    }
  }, []);

  const heading = (() => {
    switch (status) {
      case 200:
        return 'Invitation accepted!'
      case 201:
        return 'Welcome to Declaration!'
      case 400:
        return "You're already a member of this network"
      case 404:
        return 'Invitation not found'
      case 401:
        return `You're logged in as ${user.email}`
      default:
        return 'Processing invitation...'
    }
  })();

  const subHeading = (() => {
    switch (status) {
      case 200:
        return 'Redirecting...'
      case 201:
        return 'Redirecting...'
      case 400:
        return 'Redirecting...'
      case 404:
        return 'Redirecting...'
      case 401:
        return 'This invitation was sent to a different email address. Please ask the network administrator to re-send your invitation to your logged-in email address, or log in with the email address this invitation belongs to.'
      default:
        return ''
    }
  })();

  return (
    <View style={styles.container}>
      <SpinnerIcon
        width={50}
        height={50}
        fill="black"
      />

      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>

      {status === 401 &&
        <Button
          label="Okay"
          theme="transparent"
          onPress={() => 
            navigation.dispatch(
              StackActions.replace('Authentication')
            )
          }
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 12,
    lineHeight: 21,
  },
});

export default NetworkMembershipInvitationAcceptScreen;
