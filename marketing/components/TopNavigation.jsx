import Link from 'next/link';

import Button from '~/shared/components/Button';

function TopNavigation({
  links,
}) {
  return (
    <nav className="top-navigation">
      <span className="logo-wrapper">
        <Link href="/">
          <a>
            <img
              src="/images/logo-white.png"
              className="logo"
              alt="Declaration"
            />
          </a>
        </Link>
      </span>

      <span className="links-wrapper">
        {links}

        <span className="login-wrapper">
          <Link href="/log-in">
            <a>
              <Button label="Login" />
            </a>
          </Link>
        </span>
      </span>

      <style jsx>{`
        nav {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          color: white;
          background: var(--lead);
          position: fixed;
          z-index: var(--z-index-above);
          padding-top: 1.4vw;
          padding-right: 4vw;
          padding-bottom: 1.4vw;
          padding-left: 4vw;
        }

        .logo-wrapper {
          line-height: 0;
        }

        .logo {
          max-height: 15px;
        }

        .links-wrapper {
          display: inline-flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;

          & > :global(*) {
            font-size: 20px;

            &:not(:first-child) {
              margin-left: 2.6vw;
            }
          }
        }

        .login-wrapper {
          font-size: 14px;
        }
      `}</style>
    </nav>
  );
}

export default TopNavigation;
