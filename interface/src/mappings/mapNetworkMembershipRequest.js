import mapDateTime from './mapDateTime';
import mapUser from './mapUser';

const mapNetworkMembershipRequest = ({
  uuid,
  id,
  name,
  body,
  created_at,
  updated_at,
  user,
}) => ({
  uuid,
  id,
  name,
  body,
  createdAt: mapDateTime(created_at),
  updatedAt: mapDateTime(updated_at),
  user: user && mapUser(user),
});

export default mapNetworkMembershipRequest;
