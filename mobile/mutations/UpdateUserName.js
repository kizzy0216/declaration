const UpdateUserName = `
  mutation UpdateUserName($uuid: uuid!, $name: String) {
    update_user_by_pk(pk_columns: {uuid: $uuid}, _set: {name: $name}) {
      __typename
      uuid
      id
    }
  }
`;

export default UpdateUserName;
