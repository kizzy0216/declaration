import ActiveLink from '~/shared/components/ActiveLink';

const MARKETING_BASE_URL = process.env.MARKETING_BASE_URL;

import UserCell from '~/shared/components/UserCell';

function SideNavigation({
  user,
  isFetchingUser,
}) {
  return (
    <nav className="side-navigation">
      <div className="logo">
        <h1>Your Network Name</h1>
      </div>

      <div className="links">
        <ul>
          <li>
            <ActiveLink
              activeClassName="underline"
              href="/"
            >
              <a>
                Dashboard
              </a>
            </ActiveLink>
          </li>
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
              href="/members"
            >
              <a>
                Members
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
        </ul>
      </div>

      {!isFetchingUser && user && user.uuid &&
        <div className="footer">
          <UserCell
            value={user}
            showEmail
          />
          <a href={`${MARKETING_BASE_URL}/log-out`}>
            Log out
          </a>
        </div>
      }

      <style jsx>{`
        .side-navigation {
          background: var(--light-gray);
          width: 250px;
          height: 100%;
          padding-left: 30px;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
        }

        .logo {
          & h1 {
            font-size: 16px;
            font-weight: 500;
            user-select: none;
          }
        }

        .links {
          flex: 1 0 auto;
          display: flex;
          flex-flow: column;
          justify-content: center;

          & a {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 20px;

            &:hover {
              opacity: 0.7;
            }

            &.underline {
              background-size: 2px 2px;
            }
          }
        }

        ul {
          list-style: none;
        }

      `}</style>
    </nav>
  );
}

export default SideNavigation;
