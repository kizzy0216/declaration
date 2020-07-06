import UserFragment from '../fragments/UserFragment';

const InsertUserOne = `
  ${UserFragment}
  mutation InsertUserOne($email: String) {
    insert_user_one (object: {email: $email}) {
      ...UserFragment
    }
  }
`;

export default InsertUserOne;
