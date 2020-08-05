import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { UserContext } from '~/contexts/UserContext';
import TextInput from '~/components/TextInput';
import useDebouncedState from 'Shared/hooks/useDebouncedState';
import {
  fetchSuggestions,
  fetchPlace,
} from '~/utils/googlePlaces';

function UserProfileLocationInputContainer({
  onChange = () => {},
}) {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(user.profile.location || '');
  const [place, setPlace] = useState({
    label: user.profile.location || '',
    latitudeLongitude: [NaN, NaN],
  });
  const debouncedLocation = useDebouncedState(location, 300);
  const [isFetching, setIsFetching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setIsFetching(true);

    setSuggestions([]);

    fetchSuggestions({ input: debouncedLocation })
      .then(async (response) => {
        const { predictions } = await response.json();

        setSuggestions(predictions.map(({ description, place_id }) => ({
          id: place_id,
          label: description,
        })));

        setIsFetching(false);
      });
  }, [debouncedLocation]);

  useEffect(() => {
    const isDisabled = (
      !place.latitudeLongitude ||
      isNaN(place.latitudeLongitude[0]) ||
      isNaN(place.latitudeLongitude[1]) ||
      location !== place.label
    );

    onChange({
      location,
      place,
      isDisabled,
      isFetching,
    });
  }, [place, isFetching]);

  // assume the User wants the best-matching option if they typed it all out
  // instead of pressing it
  useEffect(() => {
    if (suggestions.length > 0 && suggestions[0].label === location) {
      handlePress(suggestions[0]);
    }
  }, [suggestions, location]);

  function handlePress(suggestion) {
    setIsFetching(true);

    setLocation(suggestion.label);

    fetchPlace({ placeId: suggestion.id })
      .then(async (response) => {
        const { result } = await response.json();

        setIsFetching(false);

        setPlace({
          label: suggestion.label,
          latitudeLongitude: [result.geometry.location.lat, result.geometry.location.lng],
        });
      });
  }

  const hasSuggestions = (
    suggestions.length > 0 &&
    suggestions[0].label !== location
  );

  return (
    <>
      <TextInput
        placeholder="City, State"
        value={location}
        onChange={setLocation}
        autoCapitalize="words"
      />
      <View>
        <ScrollView
          style={styles.suggestions}
          horizontal={true}
        >
          {hasSuggestions && suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              onPress={() => handlePress(suggestion)}
            >
              <Text style={styles.suggestion}>
                {suggestion.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  suggestions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 10,
    minHeight: 30,
  },
  suggestion: {
    textDecorationLine: 'underline',
    fontSize: 16,
    marginRight: 10,
  },
});

export default UserProfileLocationInputContainer;
