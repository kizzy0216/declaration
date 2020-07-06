const DeleteVerificationCode = `
  mutation DeleteVerificationCode($email: String) {
    delete_verification_code(where: {email: {_eq: $email}}) {
      affected_rows
      returning {
        __typename
        email
      }
    }
  }
`;

export default DeleteVerificationCode;
