import mapUser from './mapUser';
import mapDateTime from './mapDateTime';

const mapComment = ({
  uuid,
  id,
  text,
  creator,
  parent,
  children = [],
  children_aggregate,
  comment_ancestors = [],
  created_at,
  updated_at,
}) => ({
  uuid,
  id,
  text,
  creator: creator && mapUser(creator),
  parent: parent && mapComment(parent),
  children: children.map(mapComment),
  countChildren: children_aggregate && children_aggregate.aggregate.count,
  ancestors: comment_ancestors.map(({ ancestor }) => mapComment(ancestor)),
  createdAt: created_at && mapDateTime(created_at),
  updatedAt: updated_at && mapDateTime(updated_at),
});

export default mapComment;
