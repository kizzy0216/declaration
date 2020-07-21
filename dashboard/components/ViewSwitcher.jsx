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

    if (active.id.length > 0) {
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
        <ViewSwitcherPopover
          active={active}
          items={items}
          onToggle={handleToggle}
        />
      }

      <style jsx>{`
        .view-switcher {
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default ViewSwitcher;
