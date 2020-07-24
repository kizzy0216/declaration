const usernameRegex = /^[a-z0-9_-]{3,16}$/igm;

const isValidUsername = (username) => {
  if (username.length === 0) {
    return {
      isValid: false,
      error: '',
    };
  }

  if (username.length < 3) {
    return {
      isValid: false,
      error: 'Must be at least 3 characters long.',
    };
  }

  if (username.length > 16) {
    return {
      isValid: false,
      error: 'Must be less than 16 characters long.',
    };
  }

  if (!username.match(usernameRegex)) {
    return {
      isValid: false,
      error: "Only alphanumeric characters, '-', and '_' are allowed.",
    };
  }

  return {
    isValid: true,
    error: '',
  }
}

export default isValidUsername;
