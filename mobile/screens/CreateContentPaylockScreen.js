import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateHeader from '~/components/CreateHeader';
import { IS_IOS } from '~/constants';
import TextInput from '~/components/TextInput';
import CurrencyInput from '~/components/CurrencyInput';

function CreateContentPaylockScreen({ navigation }) {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState('');

  const isDisabled = (false);

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Payment options"
        canCancel={false}
        canBack={true}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('CreateContentMeta')}
        onCancelOrBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.row}>
            <View style={styles.column}>
              <View style={styles.odd}>
                <CurrencyInput
                  label="Price"
                  value={price}
                  onChange={setPrice}
                />
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.even}>
                <TextInput
                  label="Quantity"
                  placeholder="(Unlimited)"
                  value={quantity}
                  keyboardType="numeric"
                  onChange={setQuantity}
                />
              </View>
            </View>
          </View>

          <View style={styles.row}>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 100,
  },
  row: {
    marginBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  column: {
    width: '50%',
  },
  odd: {
    marginRight: 10,
  },
  event: {
    marginLeft: 10,
  },
});

export default CreateContentPaylockScreen;
