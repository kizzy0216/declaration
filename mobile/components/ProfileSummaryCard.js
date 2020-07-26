import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import LocationPinIcon from 'Shared/components/icons/LocationPinIcon';
import LocationPinEditIcon from 'Shared/components/icons/LocationPinEditIcon';
import LocationPinAddIcon from 'Shared/components/icons/LocationPinAddIcon';
import BriefCaseIcon from 'Shared/components/icons/BriefCaseIcon';
import BriefCaseEditIcon from 'Shared/components/icons/BriefCaseEditIcon';
import BriefCaseAddIcon from 'Shared/components/icons/BriefCaseAddIcon';
import MortarboardIcon from 'Shared/components/icons/MortarboardIcon';
import MortarboardEditIcon from 'Shared/components/icons/MortarboardEditIcon';
import MortarboardAddIcon from 'Shared/components/icons/MortarboardAddIcon';
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
      editIcon: <LocationPinEditIcon fill="#000" />,
      addIcon: <LocationPinAddIcon fill="#000" />,
      label: profile.location,
      fallbackLabel: 'Add location',
      onPress: onEditLocation,
    },
    {
      icon: <BriefCaseIcon fill="#000" />,
      editIcon: <BriefCaseEditIcon fill="#000" />,
      addIcon: <BriefCaseAddIcon fill="#000" />,
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
      editIcon: <MortarboardEditIcon fill="#000" />,
      addIcon: <MortarboardAddIcon fill="#000" />,
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
              editIcon={item.editIcon}
              addIcon={item.addIcon}
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
    borderRadius: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
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
