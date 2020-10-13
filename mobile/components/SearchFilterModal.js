// my brain broke with this one
// sometimes im reference a comment tree node (with parentId, id, children only),
// sometimes im referencing a comment (with parentId, id, text, creator, etc).
// TODO clean up
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';

import KeyboardSpacer from '~/components/KeyboardSpacer';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import ScreenHeader from '~/components/ScreenHeader';
import { BorderlessButton } from 'react-native-gesture-handler';
import CloseIcon from '@shared/components/icons/CloseIcon';

import {
  WINDOW_HEIGHT,
  LIGHT_GRAY,
} from '~/constants';

function SearchFilterModal({
  isVisible,
  filters,
  onApply = () => {},
  onClose = () => {},
}) {
  const [values, setValues] = React.useState({})

  React.useEffect(() => {
    setValues(filters)
  }, [filters]);
  // console.log('MODAL FILTERS', filters)
  const onButtonPress = () => {
    onApply(values)
  }
  return (
    <Modal
    header={
      <ScreenHeader
          containerStyle={{paddingBottom: 48}}
          leftElement={
            <BorderlessButton onPress={onClose}>
              <CloseIcon
                width={22}
                height={22}
                fill="black"
              />
            </BorderlessButton>
          }
          rightElement={
            <Button
              label={'Apply'}
              theme="primary"
              size="small"
              onPress={onButtonPress}
            />
          }
          heading='Filter'
          onClose={onClose}
        />
      }
      isVisible={isVisible}
      containerStyle={{
        backgroundColor: LIGHT_GRAY,
      }}
      shouldAvoidKeyboard={false}
      onClose={onClose}
    >
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            style={{flex: 1}}
          >
            <Text style={{paddingVertical: 64}}>Toggle Something</Text>
            
          </ScrollView>

          <KeyboardSpacer />

        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT * 0.6,
    backgroundColor: LIGHT_GRAY,
  }
});

export default SearchFilterModal;
