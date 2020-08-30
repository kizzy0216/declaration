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

import Modal from '~/components/Modal';
import TextInput from '~/components/TextInput';
import GenderInput from '~/components/GenderInput';
import DateTimePicker from '~/components/DateTimePicker';
import UserProfileUsernameInputContainer from '~/containers/UserProfileUsernameInputContainer';
import { WINDOW_HEIGHT } from '~/constants';

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
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFetchingUsername, setIsFetchingUsername] = useState(false);

  function handleSubmit() {
    onSubmit({
      name,
      username,
      personalBio,
      gender,
      dateOfBirth,
    });
  }

  function handleUsernameChange({
    username,
    isDisabled,
    isFetching,
  }) {
    setUsername(username);
    setIsDisabled(isDisabled);
    setIsFetchingUsername(isFetching);
  }

  return (
    <Modal
      position="bottom"
      hasDragHandle={false}
      heading="Profile details"
      isVisible={isVisible}
      isFetching={isFetching || isFetchingUsername}
      isSubmitDisabled={isDisabled}
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
                <UserProfileUsernameInputContainer
                  hasLabel={true}
                  onChange={handleUsernameChange}
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
                <GenderInput
                  gender={gender}
                  setGender={setGender}
                  withLabel={true}
                />
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
    height: WINDOW_HEIGHT * 0.7,
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 20,
  },
});

export default ProfileEditModal;
