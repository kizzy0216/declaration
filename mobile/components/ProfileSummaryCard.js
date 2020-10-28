import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import LocationPinIcon from '@shared/components/icons/LocationPinIcon';
import BriefCaseIcon from '@shared/components/icons/BriefCaseIcon';
import MortarboardIcon from '@shared/components/icons/MortarboardIcon';
import ProfileSummaryCardRow from '~/components/ProfileSummaryCardRow';
import {
  LIGHT_GRAY,
} from '~/constants';

function ProfileSummaryCard({
  profile,
  isEditable = false,
  onEditLocation = () => {},
  onEditWork = () => {},
  onEditEducation = () => {},
}) {
  let items = [
    {
      icon: <LocationPinIcon fill="#000" />,
      label: profile.location,
      fallbackLabel: 'Add location',
      onPress: onEditLocation,
    },
    {
      icon: <BriefCaseIcon fill="#000" />,
      label: [
        (
          profile.workTitle &&
          profile.workTitle.length > 0 &&
          profile.workTitle
        ),
        (
          profile.workPlace &&
          profile.workPlace.length > 0 &&
          profile.workPlace
        )
      ].filter(x => x).join(' at '),
      fallbackLabel: 'Add work title and place',
      onPress: onEditWork,
    },
    {
      icon: <MortarboardIcon fill="#000" />,
      label: profile.educationalInstitution,
      fallbackLabel: 'Add education',
      onPress: onEditEducation,
    },
  ];
  if (!isEditable) {
    items = items.filter(({ label }) => label && label.length > 0);
  }

  return (
    <View style={styles.profileSummaryCard}>
      <View style={styles.container}>
        {items.map((item, index) => (
          <View
            style={(index !== items.length - 1) && styles.rowWrapper}
            key={index}
          >
            <ProfileSummaryCardRow
              icon={item.icon}
              label={item.label}
              fallbackLabel={item.fallbackLabel}
              isEditable={isEditable}
              onPress={item.onPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSummaryCard: {
    backgroundColor: 'white',
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 20,
    overflow: 'visible',
  },
  container: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  rowWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY,
  },
});

export default ProfileSummaryCard;
