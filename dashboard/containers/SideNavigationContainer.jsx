import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import ActiveLink from '~/shared/components/ActiveLink';
import SideNavigation from '~/components/SideNavigation';
import { UserContext } from '~/contexts/UserContext';

function SideNavigationContainer() {
  const [isSuperAdminContext, setIsSuperAdminContext] = useState(false);
  const {
    user,
    isFetching,
    hasFetched,
  } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (router.query.networkId) { // Network specific links
      setIsSuperAdminContext(false);
    } else { // Super Admin specific links
      setIsSuperAdminContext(true);
    }
  }, [router.pathname]);

  return (
    <SideNavigation
      user={user}
      isFetchingUser={isFetching}
      hasFetchedUser={hasFetched}
      links={
        isSuperAdminContext
          ? (
            <>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/networks"
                >
                  <a>
                    Networks
                  </a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/users"
                >
                  <a>
                    Users
                  </a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/knowledge"
                >
                  <a>
                    Knowledge
                  </a>
                </ActiveLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/networks/[networkId]/members"
                  as={`/networks/${router.query.networkId}/members`}
                >
                  <a>
                    Members
                  </a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/networks/[networkId]/knowledge"
                  as={`/networks/${router.query.networkId}/knowledge`}
                >
                  <a>
                    Knowledge
                  </a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  activeClassName="underline"
                  href="/networks/[networkId]/settings"
                  as={`/networks/${router.query.networkId}/settings`}
                >
                  <a>
                    Settings
                  </a>
                </ActiveLink>
              </li>
            </>
          )
      }
    />
  );
}

export default SideNavigationContainer;
