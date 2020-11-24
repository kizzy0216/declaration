import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '~/components/Button';
import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from '@shared/components/icons/ArrowLeftIcon';
import { GRAY } from '~/constants';
import { CreateContentContext } from '~/contexts/CreateContentContext';

function CreateHeader ({
  heading,
  canCancel = true,
  canBack = false,
  canPost = true,
  canNext = false,
  isNextOrPostDisabled = false,
  isFetching = false,
  onCancelOrBack = () => {},
  onNextOrPost = () => {},
}) {
  const { clearSelections } = useContext(CreateContentContext );
  const handleBackPress = () => {
    clearSelections()
    onCancelOrBack()
  }
  return (
    <ScreenHeader
      leftElement={(
        canCancel ? (
          <Button
            theme="transparent"
            size="small"
            onPress={handleBackPress}
            label="Cancel"
            labelWrapperStyle={{ paddingLeft: 0 }}
            labelStyle={{
              color: GRAY,
            }}
          />
        ) : canBack ? (
          <TouchableOpacity onPress={handleBackPress}>
            <ArrowLeftIcon
              width={22}
              height={22}
              fill="black"
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      )}
      heading={heading}
      rightElement={(
        canNext ? (
          <Button
            theme="tertiary"
            size="small"
            onPress={onNextOrPost}
            label="Next"
            isDisabled={isNextOrPostDisabled}
            isFetching={isFetching}
          />
        ) : canPost ? (
          <Button
            theme="primary"
            size="small"
            onPress={onNextOrPost}
            label="Post"
            isDisabled={isNextOrPostDisabled}
            isFetching={isFetching}
          />
        ) : (
          <></>
        )
      )}
    />
  );
}

export default CreateHeader;
