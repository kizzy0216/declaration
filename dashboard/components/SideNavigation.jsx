import React  from 'react';

const MARKETING_BASE_URL = process.env.MARKETING_BASE_URL;

import ActiveLink from '~/shared/components/ActiveLink';
import UserCell from '~/shared/components/UserCell';
import ViewSwitcher from '~/components/ViewSwitcher';

function SideNavigation({
  user,
  links,
  isFetchingUser,
  hasFetchedUser,
}) {
  return (
    <nav className="side-navigation">
      <ViewSwitcher />

      <div className="links">
        <ul>
          {links}
        </ul>
      </div>

      {hasFetchedUser &&
        <div className="footer">
          <UserCell
            value={user}
            showEmail
            footer={
              <a
                className="log-out"
                href={`${MARKETING_BASE_URL}/log-out`}
              >
                (Log out)
              </a>
            }
          />
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

        .links {
          flex: 1 0 auto;
          display: flex;
          flex-flow: column;
          justify-content: center;

          & :global(a) {
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

        .log-out {
          color: var(--gray);
          font-size: 14px;
        }
      `}</style>
    </nav>
  );
}

export default SideNavigation;
