import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'urql';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import DisplayHeading from '~/components/DisplayHeading';
import GetNetworksWhereNotMember from '~/queries/GetNetworksWhereNotMember';
import mapNetwork from 'Shared/mappings/mapNetwork';
import { UserContext } from '~/contexts/UserContext';
import ArrowRightIcon from 'Shared/components/icons/ArrowRightIcon';

function NetworkMembershipSelectScreen({ navigation }) {
  const {
    user,
    hasSettled,
    logOut,
  } = useContext(UserContext);
  const [
    getNetworksResult,
    getNetworks,
  ] = useQuery({
    query: GetNetworksWhereNotMember,
    variables: {
      user_uuid: user.uuid,
    },
    pause: !hasSettled || !user.uuid,
  });
  const {
    data,
    fetching: isFetching,
  } = getNetworksResult;

  let items = [];
  if (!isFetching) {
    items = data
      .network
      .map(mapNetwork)
  }

  function handleLogOut() {
    logOut()
    navigation.dispatch(
      StackActions.replace('AuthenticationRoot')
    );
  }

  function handleRefresh() {
    getNetworks({ 
      requestPolicy: 'network-only',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <DisplayHeading style={styles.heading}>
        Which space were you invited to join?
      </DisplayHeading>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
          />
        }
      >
        {items.map((item) => (
          <View
            key={item.uuid}
            style={styles.buttonWrapper}
          >
            <Button
              label={item.name}
              theme="tertiary"
              onPress={() =>
                navigation.navigate(
                  'NetworkMembershipRequest',
                  { networkUuid: item.uuid },
                )
              }
              rightIcon={
                <ArrowRightIcon
                  width={22}
                  height={22}
                  fill="black"
                />
              }
            />
          </View>
        ))}
      </ScrollView>

      <Button
        label="Request your own space"
        theme="transparent"
        onPress={() => navigation.navigate('NetworkAccessRequest')}
      />
      <Button
        label="Log out"
        theme="transparent"
        onPress={handleLogOut}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  scrollView: {
    overflow: 'visible',
  },
  heading: {
    width: 300,
    paddingTop: 40,
    paddingBottom: 40,
  },
  buttonWrapper: {
    marginBottom: 10,
  }
});

export default NetworkMembershipSelectScreen;
