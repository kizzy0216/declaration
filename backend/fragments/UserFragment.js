const UserFragment = `
  fragment UserFragment on user {
    __typename
    uuid
    id
    email
    created_at
    is_verified
  }
`

export default UserFragment;
