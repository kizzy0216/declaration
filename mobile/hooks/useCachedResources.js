import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';

function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'Requiem': Asset.fromModule(require('~/shared/fonts/Requiem-Text-Roman.ttf')).uri,
          'Requiem-Italic': require('~/shared/fonts/Requiem-Text-Italic.ttf'),
          'Requiem-Display': require('~/shared/fonts/Requiem-Display-Roman.ttf'),
          'Requiem-Display-Italic': require('~/shared/fonts/Requiem-Display-Italic.ttf'),
          'Requiem-Fine': require('~/shared/fonts/Requiem-Fine-Roman.ttf'),
          'Requiem-Fine-Italic': require('~/shared/fonts/Requiem-Fine-Italic.ttf'),
        });
      } catch (event) {
        // We might want to provide this error information to an error reporting service
        console.warn(event);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

export default useCachedResources;
