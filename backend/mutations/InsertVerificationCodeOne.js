const InsertVerificationCodeOne = `
  mutation InsertVerificationCodeOne($email: String, $code: String) {
    insert_verification_code_one(objects: {email: $email, text: $code}) {
      __typename
      email
      text
    }
  }
`;

export default InsertVerificationCodeOne;
