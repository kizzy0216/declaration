import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import SpinnerIcon from 'Shared/components/icons/SpinnerIcon';
import DisplayHeading from '~/components/DisplayHeading';
import LogInForm from '~/components/LogInForm';
import {
  fetchREST,
  setJWT,
  setUser,
} from '~/utils/api';

function AuthenticationLogInScreen({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const { params = {} } = route;

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
      }).then(async (response) => {
        const {
          uuid,
          roles,
          jwt,
        } = await response.json();

        setJWT(jwt);
        setUser({
          uuid,
          roles,
        });
        setIsFetching(false);
        setHasFetched(true);

        // TODO persist jwt, user BUT ALSO set user in UserContext

        navigation.dispatch(
          StackActions.replace('UserResolution')
        );
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [params.email, params.code]);

  function handleSubmit({ email }) {
    fetchREST('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email,
        redirect: Linking.makeUrl('log-in'),
        withCookies: false,
      }),
    }).then(() => {
      setIsFetching(false);
      setHasFetched(true);
    }).catch((error) => {
      console.error(error);
    });

    navigation.dispatch(
      StackActions.replace('AuthenticationLogInFeedback')
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headingWrapper}>
          <DisplayHeading style={styles.heading}>
            What's your email address?
          </DisplayHeading>
        </View>

        {params.email && params.code
          ? (
            <>
              <Text>Logging in...</Text>
              <SpinnerIcon width="50" height="50" />
            </>
          ) : (
            <LogInForm
              onSubmit={handleSubmit}
            />
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  headingWrapper: {
    marginBottom: 40,
  },
  heading: {
    width: 250,
  },
});

export default AuthenticationLogInScreen;
