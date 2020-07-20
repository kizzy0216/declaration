import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import AnimatedSpinnerIcon from '~/components/AnimatedSpinnerIcon';
import DisplayHeading from '~/components/DisplayHeading';
import LogInForm from '~/components/LogInForm';
import { fetchREST } from '~/utils/api';
import { UserContext } from '~/contexts/UserContext';

function AuthenticationLogInScreen({ route, navigation }) {
  const {
    isAuthenticated,
    logIn,
    hasFetched: hasFetchedUser,
  } = useContext(UserContext);
  const [error, setError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { params = {} } = route;

  useEffect(() => {
    if (isAuthenticated && hasFetchedUser) {
      navigation.dispatch(
        StackActions.replace('UserResolution')
      );
    }
  }, [isAuthenticated, hasFetchedUser]);

  useEffect(() => {
    if (params.email && params.code) {
      setIsFetching(true);
      fetchREST('/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          email: params.email,
          code: params.code,
          withCookies: false,
        }),
        headers: { // clear Authorization header, to ensure this request goes unauthenticated
          'Content-Type': 'application/json',
        },
      }).then(async (response) => {
        const {
          uuid,
          roles,
          jwt,
        } = await response.json();

        setIsFetching(false);
        setHasFetched(true);

        if (jwt && uuid && roles) {
          logIn({
            jwt,
            user: {
              uuid,
              roles,
            }
          });
        } else if (response.status === 403) {
          setError('Email verification failed. Please use the latest verification email sent to your address, or try again.');
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [params.email, params.code]);

  function handleSubmit({ email }) {
    setIsFetching(true);

    fetchREST('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email,
        redirect: Linking.makeUrl('log-in'),
        withCookies: false,
      }),
      headers: { // clear Authorization header, to ensure this request goes unauthenticated
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const {
        uuid,
        roles,
        jwt,
      } = await response.json();

      setIsFetching(false);
      setHasFetched(true);

      // bypass for tester email
      if (jwt && uuid && roles) {
        logIn({
          jwt,
          user: {
            uuid,
            roles,
          }
        });
      } else {
        navigation.dispatch(
          StackActions.replace('AuthenticationLogInFeedback')
        )
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {params.email && params.code
          ? (
            <View style={styles.center}>
              {error.length === 0
                ? (
                  <AnimatedSpinnerIcon width={50} height={50} />
                ) : (
                  <Text style={styles.error}>{error}</Text>
                )
              }
            </View>
          ) : (
            <>
              <View style={styles.headingWrapper}>
                <DisplayHeading style={styles.heading}>
                  What's your email address?
                </DisplayHeading>
              </View>

              <LogInForm
                isFetching={isFetching}
                onSubmit={handleSubmit}
              />
            </>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100, // gross!
  },
  headingWrapper: {
    marginBottom: 40,
  },
  heading: {
    width: 250,
  },
  error: {
    fontSize: 16,
    lineHeight: 24
  },
});

export default AuthenticationLogInScreen;
