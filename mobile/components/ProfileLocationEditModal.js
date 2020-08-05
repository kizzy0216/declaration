import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Modal from '~/components/Modal';
import UserProfileLocationInputContainer from '~/containers/UserProfileLocationInputContainer';

function ProfileLocationEditModal({
  user,
  isVisible = false,
  isFetching = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [location, setLocation] = useState(user.profile.location);
  const [place, setPlace] = useState({});
  const [isLocalFetching, setIsLocalFetching] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  function handleSubmit() {
    onSubmit({
      location,
      latitudeLongitude: place.latitudeLongitude,
    });
  }

  function handleChange({
    location,
    place,
    isFetching,
    isDisabled,
  }) {
    setLocation(location);
    setPlace(place);
    setIsLocalFetching(isFetching);
    setIsSubmitDisabled(isDisabled);
  }

  return (
    <Modal
      isVisible={isVisible}
      position="bottom"
      hasDragHandle={false}
      heading="Location"
      isFetching={isFetching || isLocalFetching}
      isSubmitDisabled={isSubmitDisabled}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <UserProfileLocationInputContainer onChange={handleChange} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  row: {
    marginBottom: 20,
  },
});

export default ProfileLocationEditModal;
