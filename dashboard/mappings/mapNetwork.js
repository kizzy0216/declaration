import mapDateTime from '~/mappings/mapDateTime';

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
  createdAt: mapDateTime(created_at),
  updatedAt: mapDateTime(updated_at),
});

export default mapNetwork;
