function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

export default validateEmail;
