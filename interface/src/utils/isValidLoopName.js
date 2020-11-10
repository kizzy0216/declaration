const loopnameRegex = /^[a-z0-9_-]{3,16}$/igm;

const isValidLoopName = (loopname) => {
  if (loopname.length === 0) {
    return {
      isValid: false,
      error: '',
    };
  }

  if (loopname.length <= 3) {
    return {
      isValid: false,
      error: 'Must be more than 3 characters long.',
    };
  }

  if (!loopname.match(loopnameRegex)) {
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

export default isValidLoopName;
