import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import Button from '~/shared/components/Button';
import CloseIcon from '~/shared/components/icons/CloseIcon';
import MenuIcon from '~/shared/components/icons/MenuIcon';
import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';
import useWindowScrollPosition from '~/shared/hooks/useWindowScrollPosition';
import useKeyDown from '~/shared/hooks/useKeyDown';

function TopNavigation({
  isInitiallyTransparent = false,
  links,
  user = {},
  hasSettledAuthentication = false,
}) {
  const [authenticationDisplay, setAuthenticationDisplay] = useState({
    theme: 'primary',
    href: '/log-in',
    label: 'Login',
  });
  const [isActive, setIsActive] = useState(false);
  const isScrollingUp = useRef(false);
  const previousY = useRef(0);
  const { y } = useWindowScrollPosition();

  useEffect(() => {
    isScrollingUp.current = (y < previousY.current);
    previousY.current = y;
  }, [y]);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive]);

  useKeyDown('Escape', () => {
    setIsActive(false);
  });

  Router.events.on('routeChangeStart', () => {
    setIsActive(false);
  });

  function handleToggle(event) {
    event.preventDefault();

    setIsActive(!isActive);
  }

  useEffect(() => {
    if (user.uuid) {
      setAuthenticationDisplay({
        theme: 'secondary',
        href: '/log-out',
        label: 'Logout',
      });
    } else {
      setAuthenticationDisplay({
        theme: 'primary',
        href: '/log-in',
        label: 'Login',
      });
    }
  }, [user.uuid]);

  return (
    <nav className="top-navigation">
      <div
        className={[
          'top-bar',
          (isInitiallyTransparent && 'initially-transparent'),
          (y === 0 && 'at-top'),
          (isScrollingUp.current && y !== 0 && 'going-up')
        ].filter(x => x).join(' ')}
      >
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

        <span className="top-bar-links desktop">
          {links}

          <span className="authentication-action">
            <Link href={authenticationDisplay.href}>
              <a>
                <Button
                  theme={authenticationDisplay.theme}
                  label={authenticationDisplay.label}
                  leftIcon={
                    !hasSettledAuthentication && <SpinnerIcon />
                  }
                />
              </a>
            </Link>
          </span>
        </span>

        <span className="top-bar-links mobile">
          <a
            className="toggle"
            href="#toggle"
            onClick={handleToggle}
          >
            <MenuIcon fill="inherit" />
          </a>
        </span>
      </div>

      <div
        className={[
          'fullscreen-menu',
          isActive && 'active',
        ].filter(x => x).join(' ')}
      >
        <a
          className="toggle"
          href="#toggle"
          onClick={handleToggle}
        >
          <CloseIcon fill="inherit" />
        </a>

        {links}

        <span className="authentication-action">
          <Link href={authenticationDisplay.href}>
            <a>
              <Button
                theme={authenticationDisplay.theme}
                label={authenticationDisplay.label}
                size="large"
                leftIcon={
                  !hasSettledAuthentication && <SpinnerIcon />
                }
              />
            </a>
          </Link>
        </span>
      </div>

      <style jsx>{`
        .top-navigation {
          position: relative;
        }

        .top-bar {
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          color: white;
          background: var(--lead);
          position: fixed;
          z-index: var(--z-index-above);
          padding-top: 20px;
          padding-right: 60px;
          padding-bottom: 20px;
          padding-left: 60px;
          will-change: background, transform;
          transition: background 0.333s ease-in-out, transform 0.333s cubic-bezier(1,0,.57,.82);

          &.going-up {
            transform: translateY(-100%);
          }

          &.initially-transparent.at-top {
            background: none;
            transform: none;
          }

          @media (--small) {
            padding-right: 20px;
            padding-left: 20px;
          }
        }

        .logo-wrapper {
          line-height: 0;
          display: flex;
          align-items: flex-start;

          & .logo {
            height: 15px;
            width: auto;
          }
        }

        .top-bar-links {
          display: inline-flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: center;

          & .authentication-action {
            font-size: 14px;
          }

          & > :global(*) {
            font-size: 20px;

            &:not(:first-child) {
              margin-left: 2.6vw;
            }
          }

          &.desktop {
            @media (--small) {
              display: none;
            }
          }

          &.mobile {
            display: none;
            fill: white;

            @media (--small) {
              display: inline;
            }
          }
        }

        .fullscreen-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: white;
          z-index: var(--z-index-top);
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding-left: 20px;
          padding-right: 20px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.333s ease-in-out;
          fill: black;

          &.active {
            pointer-events: initial;
            opacity: 1;
          }

          & .authentication-action {
            font-size: 16px;
            width: 100%;

            & a {
              width: 100%;
            }
          }

          & .toggle {
            font-size: 20px;
            position: absolute;
            top: 20px;
            right: 20px;
          }

          & > :global(*) {
            font-size: 45px;
            font-weight: bold;
            margin-bottom: 30px;
          }
        }
      `}</style>
    </nav>
  );
}

export default TopNavigation;
