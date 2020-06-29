import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Dot from '~/components/Dot';

function DotsHeader({
  scene,
  navigation,
  sceneNames,
}) {
  if (!sceneNames.includes(scene.route.name)) {
    return null;
  }

  const isActive = ({ sceneName }) => (
    scene.route.name === sceneName
  )

  return (
    <SafeAreaView edges={['top']}>
      <View>
        <View style={styles.dotsHeader}>
          {sceneNames.map((sceneName) => (
            <Dot
              key={sceneName}
              style={styles.dot}
              isActive={isActive({ sceneName })}
            />
          ))}

          <View style={styles.closeWrapper}>
            <BorderlessButton
              onPress={() => navigation.navigate('AuthenticationHome')}
            >
              <Ionicons
                name="md-close"
                size={30}
              />
            </BorderlessButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dotsHeader: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dot: {
    marginRight: 5,
  },
  closeWrapper: {
    position: 'absolute',
    right: 20,
  },
});

export default DotsHeader;
