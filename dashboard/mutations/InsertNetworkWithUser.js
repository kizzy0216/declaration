const InsertNetworkWithUser = `
  mutation InsertNetworkWithUser(
    $network_name: String,
    $user_email: String,
    $user_role: user_role_enum
  ) {
    insert_network(
      objects: {
        name: $network_name,
        network_users:
        {
          data: {
            user: {
              data: {
                email: $user_email
              },
              on_conflict: {
                constraint: user_email_key,
                update_columns: updated_at
              }
            },
            role: $user_role
          }
        }
      }
    ) {
      affected_rows
      returning {
        __typename
        uuid
      }
    }
  }
`;

export default InsertNetworkWithUser;
