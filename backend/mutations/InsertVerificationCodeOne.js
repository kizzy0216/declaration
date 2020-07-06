const InsertVerificationCodeOne = `
  mutation InsertVerificationCodeOne($email: String, $code: String) {
    insert_verification_code(objects: {email: $email, text: $code}) {
      affected_rows
      returning {
        __typename
        email
      }
    }
  }
`;

export default InsertVerificationCodeOne;
