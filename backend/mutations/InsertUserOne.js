import UserFragment from '../fragments/UserFragment';

const InsertUserOne = `
  ${UserFragment}
  mutation InsertUserOne($email: String, $name: String) {
    insert_user_one (object: {email: $email, name: $name}) {
      ...UserFragment
    }
  }
`;

export default InsertUserOne;
