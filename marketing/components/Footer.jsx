import Link from 'next/link';

import ActiveLink from '~/shared/components/ActiveLink';

function Footer() {
  return (
    <footer>
      <div className="container">
        <ActiveLink
          href="/contact"
          activeClassName="underline"
        >
          <a>
            <h4>
              Contact us
            </h4>
          </a>
        </ActiveLink>

        <ActiveLink
          href="/terms"
          activeClassName="underline"
        >
          <a>
            <h4>
              Terms of use
            </h4>
          </a>
        </ActiveLink>

        <ActiveLink
          href="/privacy"
          activeClassName="underline"
        >
          <a>
            <h4>
              Privacy policy
            </h4>
          </a>
        </ActiveLink>

        <ActiveLink
          href="/community-guidelines"
          activeClassName="underline"
        >
          <a>
            <h4>
              Community guidelines
            </h4>
          </a>
        </ActiveLink>

        <ActiveLink
          href="/partnerships"
          activeClassName="underline"
        >
          <a>
            <h4>
              Partnerships
            </h4>
          </a>
        </ActiveLink>

        <p>
          Created in Brooklyn, New York.
        </p>
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        footer {
          min-height: 33vh;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding-left: 20px;
          padding-right: 20px;

          @media (--small) {
            align-items: flex-start;
          }
        }

        h3 {
          font-size: 40px;
          margin-bottom: 5px;

          @media (--small) {
            font-size: 20px;
          }
        }

        a {
          margin-right: 20px;

          @media (--small) {
            margin-bottom: 10px;
          }
        }

        h4 {
          font-size: 20px;

          @media (--small) {
            font-size: 16px;
          }
        }

        p {
          margin-top: 20px;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
