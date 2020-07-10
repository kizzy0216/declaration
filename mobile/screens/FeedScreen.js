import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

import Button from '~/components/Button';
import { UserContext } from '~/contexts/UserContext';
import {
  setJWT,
  setUser,
} from '~/utils/api';

function FeedScreen({ navigation }) {
  const {
    user,
    clear,
  } = useContext(UserContext);

  function handleLogOut() {
    clear();
    setJWT(null);
    setUser(null);

    navigation.dispatch(
      StackActions.replace('AuthenticationRoot', { Screen: 'AuthenticationHome' })
    );
  }

  console.log(user);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text>{user.email}</Text>
        <Button
          label="Log Out"
          onPress={handleLogOut}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});

export default FeedScreen;
