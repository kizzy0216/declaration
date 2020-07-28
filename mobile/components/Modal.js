import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { default as RNModal } from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BorderlessButton } from 'react-native-gesture-handler';

import DragHandle from '~/components/DragHandle';
import Button from '~/components/Button';
import CloseIcon from 'Shared/components/icons/CloseIcon';
import ScreenHeader from '~/components/ScreenHeader';

const BORDER_RADIUS = 20;

function Modal({
  position = 'bottom', // bottom or up
  heading = '',
  isFetching = false,
  isVisible = false,
  onClose = () => {},
  onSubmit = () => {},
  children,
}) {
  const animationIn = (
    position === 'bottom'
      ? 'slideInUp'
      : 'slideInDown'
  );

  const animationOut = (
    position === 'bottom'
      ? 'slideOutDown'
      : 'slideOutUp'
  );

  const justifyContent = (
    position === 'bottom'
      ? 'flex-end'
      : 'flex-start'
  );

  const borderBottomLeftRadius = (
    position === 'bottom'
      ? 0
      : BORDER_RADIUS
  );

  const borderBottomRightRadius = (
    position === 'bottom'
      ? 0
      : BORDER_RADIUS
  );

  const borderTopLeftRadius = (
    position === 'bottom'
      ? BORDER_RADIUS
      : 0
  );

  const borderTopRightRadius = (
    position === 'bottom'
      ? BORDER_RADIUS
      : 0
  );

  const edges = (
    position === 'bottom'
      ? ['bottom']
      : ['top']
  );

  const swipeDirection = (
    position === 'bottom'
      ? ['down']
      : ['up']
  );

  const dragHandlePaddingTop = (
    position === 'bottom'
      ? 10
      : 50
  );

  const dragHandlePaddingBottom = (
    position === 'bottom' && heading.length == 0
      ? 50
      : heading.length > 0
      ? 0
      : 10
  );

  const dragHandleElement = (
    <View
      style={{
        ...styles.dragHandleWrapper,
        paddingTop: dragHandlePaddingTop,
        paddingBottom: dragHandlePaddingBottom,
      }}
    >
      <DragHandle width={50} />
    </View>
  );

  return (
    <RNModal
      style={{
        ...styles.modal,
        justifyContent,
      }}
      isVisible={isVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      backdropOpacity={0.40}
      swipeDirection={swipeDirection}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      propagateSwipe={true}
      avoidKeyboard={true}
    >
      <SafeAreaView
        style={{
          ...styles.safeArea,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          borderTopLeftRadius,
        }}
        edges={edges}
      >
        {position === 'bottom' && dragHandleElement}

        {heading.length > 0 &&
          <View style={styles.headerWrapper}>
            <ScreenHeader
              heading={heading}
              rightElement={
                <Button
                  label="Save"
                  theme="tertiary"
                  size="small"
                  isFetching={isFetching}
                  onPress={onSubmit}
                />
              }
            />
          </View>
        }

        {children}

        {position === 'top' && dragHandleElement}
      </SafeAreaView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  safeArea: {
    backgroundColor: 'white',
  },
  headerWrapper: {
  },
  dragHandleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
});

export default Modal;
