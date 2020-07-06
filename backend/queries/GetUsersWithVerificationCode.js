import UserFragment from '../fragments/UserFragment';
import VerificationCodeFragment from '../fragments/VerificationCodeFragment';

const GetUsersWithVerificationCode = `
  ${UserFragment}
  ${VerificationCodeFragment}
  query GetUsersWithVerificationCode($email: String, $uuid: uuid, $code: String) {
    user(where: {uuid: {_eq: $uuid}, email: {_eq: $email}, verification_code: {text: {_eq: $code}}}) {
      ...UserFragment
      verification_code {
        ...VerificationCodeFragment
      }
    }
  }
`;

export default GetUsersWithVerificationCode;
