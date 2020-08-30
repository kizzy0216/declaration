import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';

function OnboardingHeader ({
  activePageIndex,
  countPages,
  navigation,
}) {
  return (
    <ScreenHeader
      activePageIndex={activePageIndex}
      countPages={countPages}
      leftElement={
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
