import { NETWORK_ADMIN_ROLE } from '~/shared/constants';

const GetUserAsAdmin = `
  query GetUserAsAdmin($uuid: uuid!) {
    user_by_pk(uuid: $uuid) {
      __typename
      uuid
      id
      name
      email
      created_at
      updated_at
      network_users(
        where: {role: {_eq: ${NETWORK_ADMIN_ROLE}}},
        order_by: {network: {name: asc}}
      ) {
        network {
          __typename
          uuid
          id
          name
          avatar
        }
      }
      super_admin {
        __typename
        user_uuid
      }
    }
    network {
      __typename
      uuid
      id
      name
      avatar
    }
  }
`;

export default GetUserAsAdmin;
