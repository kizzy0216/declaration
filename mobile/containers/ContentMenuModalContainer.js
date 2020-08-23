import React, { useContext } from 'react';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import { UserContext } from '~/contexts/UserContext';
import ContentMenuModal from '~/components/ContentMenuModal';

const ContentMenuModalContainer = ({
  item,
  isVisible,
  onClose = () => {},
}) => {
  const { user: authenticatedUser } = useContext(UserContext);
  const { deleteItem } = useContext(ContentTilePagerContext);

  const canDelete = (
    authenticatedUser.uuid === item.creator.uuid
  );

  return (
    <ContentMenuModal
      item={item}
      isVisible={isVisible}
      canDelete={canDelete}
      onClose={onClose}
      onDelete={() => {
        onClose();
        deleteItem(item);
      }}
    />
  );
}

export default ContentMenuModalContainer;
