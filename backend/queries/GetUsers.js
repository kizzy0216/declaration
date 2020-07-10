import UserFragment from '../fragments/UserFragment';
import VerificationCodeFragment from '../fragments/VerificationCodeFragment';

const GetUsers = `
  ${UserFragment}
  ${VerificationCodeFragment}
  query GetUsers($email: String, $uuid: uuid) {
    user(where: {email: {_eq: $email}, uuid: {_eq: $uuid}}) {
      ...UserFragment
      super_admin {
        user_uuid
      }
      verification_code {
        ...VerificationCodeFragment
      }
    }
  }
`;

export default GetUsers;
