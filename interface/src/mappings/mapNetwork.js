import mapDateTime from './mapDateTime';

const mapNetwork = ({
  uuid,
  id,
  name,
  created_at,
  updated_at,
}) => ({
  uuid,
  id,
  name,
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
});

export default mapNetwork;
