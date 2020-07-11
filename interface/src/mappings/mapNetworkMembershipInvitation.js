import mapDateTime from './mapDateTime';

const mapNetworkMembershipInvitation = ({
  uuid,
  id,
  user_name,
  user_email,
  created_at,
  updated_at,
  user,
}) => ({
  uuid,
  id,
  user: {
    name: user_name,
    email: user_email,
  },
  createdAt: mapDateTime(created_at),
  updatedAt: mapDateTime(updated_at),
});

export default mapNetworkMembershipInvitation;
