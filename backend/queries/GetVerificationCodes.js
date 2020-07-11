import VerificationCodeFragment from '../fragments/VerificationCodeFragment';

const GetVerificationCodes = `
  ${VerificationCodeFragment}
  query GetVerificationCodes($email: String, $code: String) {
    verification_code(where: {email: {_eq: $email}, text: {_eq: $code}}) {
      ...VerificationCodeFragment
    }
  }
`;

export default GetVerificationCodes;
