import { MEMBER_ROLE } from '../shared/constants';

const InsertNetworkUserOne = `
  mutation InsertNetworkUserOne(
    $network_uuid: uuid,
    $user_uuid: uuid
  ) {
    insert_network_user_one(
      object: {
        network_uuid: $network_uuid,
        user_uuid: $user_uuid,
        role: "${MEMBER_ROLE}"
      }
    ) {
      __typename
      user_uuid
      network_uuid
      role
    }
  }
`;

export default InsertNetworkUserOne;
