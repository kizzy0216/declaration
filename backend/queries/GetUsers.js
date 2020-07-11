import UserFragment from '../fragments/UserFragment';

const GetUsers = `
  ${UserFragment}
  query GetUsers($email: String, $uuid: uuid) {
    user(where: {email: {_eq: $email}, uuid: {_eq: $uuid}}) {
      ...UserFragment
      super_admin {
        user_uuid
      }
    }
  }
`;

export default GetUsers;
