import ActiveLink from '~/shared/components/ActiveLink';

function SideNavigation() {
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
              href="/content"
            >
              <a>
                Content
              </a>
            </ActiveLink>
          </li>
        </ul>
      </div>

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
        }

        ul {
          list-style: none;
        }

        a {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 20px;

          &.underline {
            background-size: 2px 2px;
          }
        }
      `}</style>
    </nav>
  );
}

export default SideNavigation;
