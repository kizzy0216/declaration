import React, { useContext } from 'react';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import { UserContext } from '~/contexts/UserContext';
import ContentMenuModal from '~/components/ContentMenuModal';

const ContentMenuModalContainer = ({
  isVisible,
  onClose = () => {},
}) => {
  const { user: authenticatedUser } = useContext(UserContext);
  const {
    itemUuids,
    items,
    activeIndex,
    deleteItem,
  } = useContext(ContentTilePagerContext);

  const activeItemUuid = itemUuids[activeIndex];
  const activeItem = (
    activeItemUuid ? items[activeItemUuid] : null
  );

  const canDelete = (
    activeItem &&
    activeItem.creator &&
    authenticatedUser.uuid === activeItem.creator.uuid
  );

  return (
    <ContentMenuModal
      item={activeItem}
      isVisible={isVisible}
      canDelete={canDelete}
      onClose={onClose}
      onDelete={() => {
        onClose();
        deleteItem(activeItem);
      }}
    />
  );
}

export default ContentMenuModalContainer;
