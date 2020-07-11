import { MEMBER_ROLE } from '~/shared/constants';

const InsertNetworkMember = `
  mutation InsertNetworkMember(
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
      network_uuid
      user_uuid
    }
  }
`;

export default InsertNetworkMember;
