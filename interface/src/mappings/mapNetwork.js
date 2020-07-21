import mapDateTime from './mapDateTime';

const REST_BASE_URL = process.env.REST_BASE_URL;

const mapNetwork = ({
  uuid,
  id,
  name,
  avatar = '',
  created_at,
  updated_at,
}) => ({
  uuid,
  id,
  name,
  avatar: (
    avatar && avatar.length > 0
      ? avatar
      : `${REST_BASE_URL}/avatar/${uuid}`
  ),
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
});

export default mapNetwork;
