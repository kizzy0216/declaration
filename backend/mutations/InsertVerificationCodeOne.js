const InsertVerificationCodeOne = `
  mutation InsertVerificationCodeOne(
    $email: String,
    $code: String,
    $redirect: String
  ) {
    insert_verification_code_one(
      object: {
        email: $email,
        text: $code,
        redirect: $redirect
      }
    ) {
      __typename
      uuid
      email
      text
      redirect
    }
  }
`;

export default InsertVerificationCodeOne;
