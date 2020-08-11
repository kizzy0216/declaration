import calculateAge from '@shared/utils/calculateAge';

const isValidDateOfBirth = (dateOfBirth) => {
  if (calculateAge(dateOfBirth) < 16) {
    return {
      isValid: false,
      error: 'Must be at least 16 years old',
    };
  }

  return {
    isValid: true,
    error: '',
  }
}

export default isValidDateOfBirth;
