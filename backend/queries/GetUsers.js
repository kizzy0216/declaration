import UserFragment from '../fragments/UserFragment';

const GetUsers = `
  ${UserFragment}
  query GetUsers($email: String, $uuid: uuid) {
    user(where: {email: {_eq: $email}, uuid: {_eq: $uuid}}) {
      ...UserFragment
    }
  }
`;

export default GetUsers;
