import mapUser from './mapUser';
import mapDateTime from './mapDateTime';

const mapNetworkUser = ({
  network_uuid,
  user_uuid,
  role,
  is_blocked,
  user,
  created_at,
  updated_at,
}) => ({
  networkUuid: network_uuid,
  userUuid: user_uuid,
  role,
  user: mapUser(user),
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
  isBlocked: is_blocked,
});

export default mapNetworkUser;
