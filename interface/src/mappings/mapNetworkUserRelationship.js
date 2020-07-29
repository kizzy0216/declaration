import mapDateTime from './mapDateTime';

const mapNetworkUserRelationship = ({
  from_network_user_relationships,
  to_network_user_relationships,
}) => {
  const hasFromRelationship = (from_network_user_relationships.length > 0);
  const hasToRelationship = (to_network_user_relationships.length > 0);

  let from = {};
  let to = {};

  if (hasFromRelationship) {
    const from_relationship = from_network_user_relationships[0];

    from = {
      uuid: from_relationship.uuid,
      type: from_relationship.type,
      createdAt: from_relationship.created_at && mapDateTime(from_relationship.created_at),
      updatedAt: from_relationship.updated_at && mapDateTime(from_relationship.updated_at),
    };
  }

  if (hasToRelationship) {
    const to_relationship = to_network_user_relationships[0];

    to = {
      uuid: to_relationship.uuid,
      type: to_relationship.type,
      createdAt: to_relationship.created_at && mapDateTime(to_relationship.created_at),
      updatedAt: to_relationship.updated_at && mapDateTime(to_relationship.updated_at),
    };
  }

  return {
    from,
    to,
  };
}

export default mapNetworkUserRelationship;
