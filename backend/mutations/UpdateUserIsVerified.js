const UpdateUserEmail = `
  mutation UpdateUserEmail($uuid: uuid, $is_verified: Boolean) {
    update_user(where: {uuid: {_eq: $uuid}}, _set: {is_verified: $is_verified}) {
      affected_rows
      returning {
        __typename
        uuid
        is_verified
      }
    }
  }
`

export default UpdateUserEmail;
