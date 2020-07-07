import React, { useState } from 'react';
import { useQuery } from 'urql';

import SideNavigation from '~/components/SideNavigation';
import GetUser from '~/queries/GetUser';

function SideNavigationContainer({
  userUuid,
}) {
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [getUserResult] = useQuery({
    query: GetUser,
    variables: {
      uuid: userUuid,
    },
  });

  return (
    <SideNavigation
      user={getUserResult.data.user_by_pk}
      isFetchingUser={getUserResult.fetching}
    />
  );
}

export default SideNavigationContainer;
