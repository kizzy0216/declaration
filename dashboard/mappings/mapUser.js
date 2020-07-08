import mapNetwork from '~/mappings/mapNetwork';
import mapDateTime from '~/mappings/mapDateTime';
import {
  NETWORK_ADMIN_ROLE,
  COMMUNITY_MANAGER_ROLE,
  MEMBER_ROLE,
} from '~/shared/constants';

const mapUserRole = role => (() => {
  switch (role) {
    case NETWORK_ADMIN_ROLE:
      return 'Admin';
    case COMMUNITY_MANAGER_ROLE:
      return 'Community Manager';
    case MEMBER_ROLE: 
      return 'Member';
    default:
      return 'Unknown Role';
  }
})();

const mapUserProfile = ({
  location,
  photo,
}) => ({
  location: location || 'Unknown Location',
  photo,
});

const mapUser = ({
  uuid,
  id,
  name,
  email,
  created_at,
  updated_at,
  network_users = [],
  super_admin = null,
  role,
  user_profile = {},
  is_blocked,
}) => ({
  uuid,
  id,
  name,
  email,
  createdAt: mapDateTime(created_at),
  updatedAt: mapDateTime(updated_at),
  networkUuids: network_users.map(({ network }) => network.uuid),
  networkIds: network_users.map(({ network }) => network.id),
  networksByUuid: network_users.reduce((accumulator, { network }) => {
    accumulator[network.uuid] = mapNetwork(network);
    return accumulator;
  }, {}),
  networksById: network_users.reduce((accumulator, { network }) => {
    accumulator[network.id] = mapNetwork(network);
    return accumulator;
  }, {}),
  profile: mapUserProfile(user_profile || {}),
  role: mapUserRole(role),
  rolesByNetworkUuid: network_users.reduce((accumulator, { network, role }) => {
    accumulator[network.uuid] = mapUserRole(role);
    return accumulator;
  }, {}),
  rolesByNetworkId: network_users.reduce((accumulator, { network, role }) => {
    accumulator[network.id] = mapUserRole(role);
    return accumulator;
  }, {}),
  isSuperAdmin: !!super_admin,
  isBlocked: is_blocked,
});

export default mapUser;
