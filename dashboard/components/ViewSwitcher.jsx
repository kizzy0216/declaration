import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import ViewSwitcherHeader from '~/components/ViewSwitcherHeader';
import ViewSwitcherPopover from '~/components/ViewSwitcherPopover';
import { UserContext } from '~/contexts/UserContext';
import { SUPER_ADMIN_VIEW_CONTEXT } from '~/shared/constants';

function ViewSwitcher() {
  const [active, setActive] = useState({
    id: '',
    name: '',
  });
  const [isActive, setIsActive] = useState(false);
  const {
    user,
    hasFetched,
  } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched) {
      return;
    }

    const { networkId } = router.query;

    if (networkId) {
      setActive({
        id: networkId,
        name: user.networksById[networkId].name,
        uuid: user.networksById[networkId].uuid,
        avatar: user.networksById[networkId].avatar,
      });
    } else {
      setActive({
        id: SUPER_ADMIN_VIEW_CONTEXT,
        name: 'Super Admin',
      });
    }
  }, [hasFetched, router.pathname]);

  // account for the active network's data changing elsewhere
  useEffect(() => {
    if (!hasFetched) {
      return;
    }

    if (
      active.id &&
      active.id.length > 0 &&
      user.networksById[active.id] &&
      (
        user.networksById[active.id].name !== active.name ||
        user.networksById[active.id].avatar !== active.avatar
      )
    ) {
      setActive({
        ...active,
        name: user.networksById[active.id].name,
        avatar: user.networksById[active.id].avatar,
      });
    }
  }, [hasFetched, user]);

  if (!hasFetched) {
    return null;
  }

  function handleToggle() {
    setIsActive(!isActive);
  }

  const onClose = () => {
    setIsActive(false);
  }

  const items = [
    user.isSuperAdmin && {
      id: SUPER_ADMIN_VIEW_CONTEXT,
      name: 'Super Admin',
    },
    ...user.networkIds.map((id) => user.networksById[id]),
  ].filter(x => x);

  return (
    <div className="view-switcher">
      <ViewSwitcherHeader
        active={active}
        items={items}
        onToggle={handleToggle}
      />

      {isActive &&
        <>
          <div className="overlay" onClick={onClose} />
          <ViewSwitcherPopover
            active={active}
            items={items}
            onToggle={handleToggle}
          />
        </>
      }

      <style jsx>{`
        .view-switcher {
          position: relative;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 3;
        }
      `}</style>
    </div>
  );
}

export default ViewSwitcher;
