import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';
import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';

function OnboardingHeader ({
  activePageIndex,
  countPages,
  navigation,
}) {
  const getOut =  () => {
    navigation.dispatch(
      StackActions.replace('Authentication')
    )
  }
  return (
    <ScreenHeader
      activePageIndex={activePageIndex}
      countPages={countPages}
      leftElement={
        <TouchableOpacity onPress={() => activePageIndex ? navigation.goBack() : getOut()}>
          <ArrowLeftIcon
            width={22}
            height={22}
            fill="black"
          />
        </TouchableOpacity>
      }
      rightElement={<></>}
    />
  );
}

export default OnboardingHeader;
