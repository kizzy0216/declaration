import Constants from 'expo-constants';

const { GOOGLE_API_KEY } = Constants.manifest.extra;

const GOOGLE_PLACE_API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place';

const sessionToken = String(Number(new Date()));

export const fetchSuggestions = ({
  input,
  types,
}) => {
  return fetch(
    `${GOOGLE_PLACE_API_ENDPOINT}/autocomplete/json?` + new URLSearchParams({
      input,
      types,
      key: GOOGLE_API_KEY,
      sessiontoken: sessionToken,
    }), {
      method: 'GET',
    }
  );
}

export const fetchPlace = ({ placeId }) => {
  return fetch(
    `${GOOGLE_PLACE_API_ENDPOINT}/details/json?` + new URLSearchParams({
      placeid: placeId,
      key: GOOGLE_API_KEY,
    }), {
      method: 'GET',
    }
  );
}
