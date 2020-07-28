import React, { useState } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';
import DateTimePicker from '~/components/DateTimePicker';

const GENDER_TAGS = [
  'Male',
  'Female',
  'Undisclosed',
];

function ProfileEditModal({
  user,
  isVisible = false,
  isFetching = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [name, setName] = useState(user.name || '');
  const [username, setUsername] = useState(user.profile.username || '');
  const [personalBio, setPersonalBio] = useState(user.profile.personalBio || '');
  const [gender, setGender] = useState(user.profile.private.gender || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.profile.private.dateOfBirth || null);

  function handleSubmit() {
    onSubmit({
      name,
      username,
      personalBio,
      gender,
      dateOfBirth,
    });
  }

  return (
    <Modal
      position="bottom"
      hasDragHandle={false}
      heading="Profile details"
      isVisible={isVisible}
      isFetching={isFetching}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback>
            <View>
              <View style={styles.row}>
                <TextInput
                  label="Name"
                  placeholder="Full name"
                  value={name}
                  onChange={setName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label="Username"
                  placeholder="username"
                  autoCorrect={false}
                  autoCapitalize="none"
                  maxLength={16}
                  value={username}
                  onChange={username => setUsername(username.toLowerCase())}
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label="Personal bio"
                  placeholder="Personal bio"
                  multiline={true}
                  minHeight={100}
                  maxHeight={150}
                  value={personalBio}
                  onChange={setPersonalBio}
                />
              </View>
              <View style={styles.row}>
                <DateTimePicker
                  label="Date of birth"
                  mode="date"
                  placeholder="Month / Date / Year"
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label="Gender"
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
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginRight: 10,
  },
});

export default ProfileEditModal;
