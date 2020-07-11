import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'urql';
import { Ionicons } from '@expo/vector-icons';

import Button from '~/components/Button';
import DisplayHeading from '~/components/DisplayHeading';
import GetNetworksWhereNotMember from '~/queries/GetNetworksWhereNotMember';
import mapNetwork from 'Shared/mappings/mapNetwork';
import { UserContext } from '~/contexts/UserContext';

function NetworkMembershipSelectScreen({ navigation }) {
  const {
    user,
    hasSettled,
  } = useContext(UserContext);
  const [getNetworksResult] = useQuery({
    query: GetNetworksWhereNotMember,
    variables: {
      user_uuid: user.uuid || null,
    },
    pause: !hasSettled,
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

  return (
    <SafeAreaView style={styles.container}>
      <DisplayHeading style={styles.heading}>
        Which space were you invited to join?
      </DisplayHeading>

      <ScrollView style={styles.scrollView}>
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
                <Ionicons
                  name="md-arrow-forward"
                  size={22}
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
