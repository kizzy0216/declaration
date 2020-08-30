import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { CreateContentContext } from '~/contexts/CreateContentContext';
import CreateHeader from '~/components/CreateHeader';
import TextInput from '~/components/TextInput';
import TextInputGroup from '~/components/TextInputGroup';
import AvatarPicker from '~/components/AvatarPicker';
import { IS_IOS } from '~/constants';
import CheckmarkIcon from '@shared/components/icons/CheckmarkIcon';
import isValidURL from '@shared/utils/isValidURL';

const COUNT_CRITERIA = 3;

function CreateContentOpportunityListingScreen({ navigation }) {
  const {
    heading,
    subHeading,
    opportunityListing,

    setHeading,
    setSubHeading,
    setOpportunityListing,
  } = useContext(CreateContentContext);

  useFocusEffect(() => {
    if (opportunityListing.criteria.length === 0) {
      setOpportunityListing({
        ...opportunityListing,
        criteria: [...new Array(COUNT_CRITERIA)].map(() => ''),
      });
    } else if (opportunityListing.criteria.length > COUNT_CRITERIA) {
      setOpportunityListing({
        ...opportunityListing,
        criteria: opportunityListing.criteria.slice(0, COUNT_CRITERIA),
      });
    } else if (opportunityListing.criteria.length < COUNT_CRITERIA) {
      setOpportunityListing({
        ...opportunityListing,
        criteria: [
          ...opportunityListing.criteria,
          ...[...new Array(COUNT_CRITERIA - opportunityListing.criteria.length)].map(() => ''),
        ],
      });
    }
  });

  const handleAvatarChange = (asset) => {
    setOpportunityListing({
      ...opportunityListing,
      company: {
        ...opportunityListing.company,
        localPhotoAsset: {
          ...asset,
          mediaType: 'photo',
        },
      },
    });
  }

  const callToActionHrefError = (
    opportunityListing.callToAction.href.length > 0
      ? isValidURL(opportunityListing.callToAction.href)
        ? ''
        : 'Invalid URL'
      : ''
  );

  const isDisabled = (
    heading.length === 0 ||
    subHeading.length === 0 ||
    opportunityListing.criteria.length === 0 ||
    opportunityListing.criteria.filter(c => c.length === 0).length > 0 ||
    callToActionHrefError.length > 0
  );

  return (
    <SafeAreaView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1}}
    >
      <CreateHeader
        heading="Add opportunity listing"
        canCancel={true}
        canBack={false}
        canNext={true}
        canPost={false}
        isNextOrPostDisabled={isDisabled}
        onNextOrPost={() => navigation.navigate('CreateContentMedia')}
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
            <TextInput
              label="Add a short headline"
              placeholder="We are hiring"
              value={heading}
              onChange={setHeading}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Name the position title"
              placeholder="Senior Graphic Designer"
              value={subHeading}
              onChange={setSubHeading}
            />
          </View>

          <View style={styles.row}>
            <TextInputGroup
              label="Add criteria"
              options={opportunityListing.criteria}
              renderPreInput={(_, index) => (
                <View style={{marginRight: 20}}>
                  <CheckmarkIcon
                    width={16}
                    height={16}
                    fill="black"
                  />
                </View>
              )}
              renderPlaceholder={(option, index) => `Enter criteria ${index + 1}`}
              onChange={criteria => setOpportunityListing({ ...opportunityListing, criteria })}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              label="Add link"
              placeholder="yoursite.com"
              value={opportunityListing.callToAction.href}
              onChange={href =>
                setOpportunityListing({
                  ...opportunityListing,
                  callToAction: {
                    ...opportunityListing.callToAction,
                    href,
                  },
                })
              }
              error={callToActionHrefError}
              autoCompleteType="off"
              autoCapitalize="none"
            />
          </View>

          <View style={[styles.row, styles.companyRow]}>
            <View style={styles.companyNameWrapper}>
              <TextInput
                label="Add the company name"
                placeholder="Declaration"
                value={opportunityListing.company.name}
                onChange={name =>
                  setOpportunityListing({
                    ...opportunityListing,
                    company: {
                      ...opportunityListing.company,
                      name,
                    },
                  })
                }
              />
            </View>

            <View style={styles.avatarPickerWrapper}>
              <Text style={styles.label}>
                Upload a company photo
              </Text>
              <AvatarPicker
                name={opportunityListing.company.name}
                onChange={handleAvatarChange}
              />
            </View>
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
  },
  avatarPickerWrapper: {
    paddingTop: 30,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default CreateContentOpportunityListingScreen;
