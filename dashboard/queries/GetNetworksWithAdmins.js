import { NETWORK_ADMIN_ROLE } from '~/shared/constants';

const GetNetworksWithAdmins = `
  query GetNetworksWithAdmins($role: user_role_enum = ${NETWORK_ADMIN_ROLE}) {
    network {
      __typename
      uuid
      id
      name
      updated_at
      created_at
      network_users_aggregate {
        aggregate {
          count
        }
      }
      network_users(where: {role: {_eq: $role}}, limit: 3) {
        created_at
        updated_at
        user {
          __typename
          uuid
          id
          name
          email
        }
      }
    }
  }
`;

export default GetNetworksWithAdmins;
