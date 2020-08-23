import React, { useContext } from 'react';

import { ContentTilePagerContext } from '~/contexts/ContentTilePagerContext';
import ContentCommentModal from '~/components/ContentCommentModal';

const ContentCommentModalContainer = ({
  isVisible,
  onClose = () => {},
}) => {
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

  return (
    <ContentCommentModal
      item={activeItem}
      isVisible={isVisible}
      onClose={onClose}
    />
  );
}

export default ContentCommentModalContainer;
