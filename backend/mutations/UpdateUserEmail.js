const UpdateUserEmail = `
  mutation UpdateUserEmail($uuid: uuid, $email: String) {
    update_user(where: {uuid: {_eq: $uuid}}, _set: {email: $email}) {
      affected_rows
      returning {
        __typename
        uuid
        email
      }
    }
  }
`

export default UpdateUserEmail;
