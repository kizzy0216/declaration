import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useQuery } from 'urql';

import GetUsersWithUsername from '~/queries/GetUsersWithUsername';
import { UserContext } from '~/contexts/UserContext';
import TextInput from '~/components/TextInput';
import isValidUsername from 'Shared/utils/isValidUsername';
import useDebouncedState from 'Shared/hooks/useDebouncedState';

function UserProfileUsernameInputContainer({
  onChange = () => {},
  hasLabel = false,
}) {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user.profile.username || '');
  const debouncedUsername = useDebouncedState(username, 300);
  const [
    getUsersWithUsernameResult,
    getUsersWithUsername,
  ] = useQuery({
    query: GetUsersWithUsername,
    variables: {
      username: debouncedUsername,
    },
    pause: !debouncedUsername,
  });

  const { isValid, error: validationError } = isValidUsername(username);
  const isTaken = (
    !getUsersWithUsernameResult.fetching &&
    getUsersWithUsernameResult.data &&
    getUsersWithUsernameResult.data.user_profile &&
    getUsersWithUsernameResult.data.user_profile.length > 0 &&
    getUsersWithUsernameResult.data.user_profile[0].uuid !== user.profile.uuid
  );
  const isDisabled = (!isValid || isTaken || getUsersWithUsernameResult.fetching);
  const takenError = (
    isTaken
      ? 'Username taken'
      : ''
  );

  useEffect(() => {
    getUsersWithUsername();
  }, [debouncedUsername]);

  useEffect(() => {
    onChange({
      username: debouncedUsername,
      isDisabled,
      isFetching: getUsersWithUsernameResult.fetching,
    });
  }, [isDisabled, debouncedUsername, getUsersWithUsernameResult.fetching]);

  function handleChange (username) {
    setUsername(username.toLowerCase());
  }

  return (
    <TextInput
      label={hasLabel ? 'Username' : ''}
      placeholder="username"
      autoCorrect={false}
      autoCapitalize="none"
      maxLength={16}
      error={validationError || takenError}
      value={username}
      onChange={handleChange}
    />
  );
}

export default UserProfileUsernameInputContainer;
