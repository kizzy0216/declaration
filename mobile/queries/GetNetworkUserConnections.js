import {
  CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE,
} from '@shared/constants';

const GetNetworkUserConnections = `
  query GetNetworkUserConnections(
    $network_uuid: uuid!,
    $user_uuid: uuid!
  ) {
    network_user_relationship(
      where: {
        _and: [
          {network_uuid: {_eq: $network_uuid}},
          {type: {_eq: ${CONNECTED_NETWORK_USER_RELATIONSHIP_TYPE}}},
          {_or: [{from_user_uuid: {_eq: $user_uuid}}, {to_user_uuid: {_eq: $user_uuid}}]}
        ]
      }
    ) {
      __typename
      to_user_uuid
      to_user {
        __typename
        uuid
        name
        user_profile {
          __typename
          username
          photo
        }
      }
      from_user_uuid
      from_user {
        __typename
        uuid
        name
        user_profile {
          __typename
          username
          photo
        }
      }
    }
  }
`;

export default GetNetworkUserConnections;
