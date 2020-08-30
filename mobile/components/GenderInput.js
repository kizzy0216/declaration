import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import TextInput from '~/components/TextInput';

const GENDER_TAGS = [
  'Male',
  'Female',
  'Undisclosed',
];

function GenderInput({
  gender,
  setGender,
  withLabel = false,
}) {
  return (
    <>
      <TextInput
        label={withLabel ? 'Gender' : ''}
        placeholder="Gender"
        value={gender}
        onChange={setGender}
      />
      <View>
        <ScrollView
          style={styles.tags}
          horizontal={true}
        >
          {GENDER_TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => setGender(tag)}
            >
              <Text style={styles.tag}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tag: {
    textDecorationLine: 'underline',
    fontSize: 14,
    marginRight: 10,
  },
});

export default GenderInput;
