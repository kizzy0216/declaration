import mapNetwork from './mapNetwork';
import mapDateTime from './mapDateTime';

const mapUserProfilePrivate = ({
  uuid,
  id,
  date_of_birth,
  gender,
  created_at,
  updated_at,
}) => ({
  uuid,
  id,
  dateOfBirth: date_of_birth && mapDateTime(date_of_birth),
  gender,
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
});

const mapUserProfile = ({
  uuid,
  id,
  username,
  location,
  photo,
  personal_bio,
  educational_institution,
  work_place,
  work_title,
  work_bio,
  user_profile_private = {},
  created_at,
  updated_at,
}) => ({
  uuid,
  id,
  username,
  location,
  photo,
  personalBio: personal_bio,
  educationalInstitution: educational_institution,
  workPlace: work_place,
  workTitle: work_title,
  workBio: work_bio,
  private: mapUserProfilePrivate(user_profile_private || {}),
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
});

const mapUser = ({
  uuid,
  id,
  name = '',
  email,
  created_at,
  updated_at,
  network_users = [],
  super_admin = null,
  role,
  user_profile = {},
}) => ({
  uuid,
  id,
  name: name || '',
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
  role: role,
  rolesByNetworkUuid: network_users.reduce((accumulator, { network, role }) => {
    accumulator[network.uuid] = role;
    return accumulator;
  }, {}),
  rolesByNetworkId: network_users.reduce((accumulator, { network, role }) => {
    accumulator[network.id] = role;
    return accumulator;
  }, {}),
  isBlockedByNetworkUuid: network_users.reduce((accumulator, { network, is_blocked }) => {
    accumulator[network.uuid] = is_blocked;
    return accumulator;
  }, {}),
  isBlockedByNetworkId: network_users.reduce((accumulator, { network, is_blocked }) => {
    accumulator[network.id] = is_blocked;
    return accumulator;
  }, {}),
  isSuperAdmin: !!super_admin,
});

export default mapUser;
