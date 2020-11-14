import * as Font from 'expo-font';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular
} from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';

function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  
  useFonts({ Roboto_500Medium, Roboto_400Regular })
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          'Orpheus': Asset.fromModule(require('~/shared/fonts/Orpheus.ttf')).uri,
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
