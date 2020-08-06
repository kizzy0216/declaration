import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from '~/components/Button';
import ScreenHeader from '~/components/ScreenHeader';
import ArrowLeftIcon from 'Shared/components/icons/ArrowLeftIcon';

function CreateHeader ({
  heading,
  canCancel = true,
  canBack = false,
  canPost = true,
  canNext = false,
  onCancelOrBack = () => {},
  onNextOrPost = () => {},
}) {
  return (
    <ScreenHeader
      leftElement={(
        canCancel ? (
          <Button
            theme="transparent"
            size="small"
            onPress={onCancelOrBack}
            label="Cancel"
          />
        ) : canBack ? (
          <TouchableOpacity onPress={onCancelOrBack}>
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
            theme="secondary"
            size="small"
            onPress={onNextOrPost}
            label="Next"
          />
        ) : canPost ? (
          <Button
            theme="primary"
            size="small"
            onPress={onNextOrPost}
            label="Post"
          />
        ) : (
          <></>
        )
      )}
    />
  );
}

export default CreateHeader;
