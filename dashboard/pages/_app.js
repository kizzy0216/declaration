import Head from 'next/head';
import Link from 'next/link';
import App from 'next/app'
import cookie from 'cookie';
import fetch from 'isomorphic-unfetch';
import { withUrqlClient } from 'next-urql';

import '~/shared/styles/variables.css';
import '~/shared/styles/base.css';

import AuthenticationWall from '~/components/AuthenticationWall';
import SideNavigation from '~/components/SideNavigation';
import { JWT_COOKIE_KEY } from '~/constants';

let inMemoryJWT;
function Application({ Component, pageProps, jwt }) {
  if (jwt.length > 0) {
    inMemoryJWT = jwt;
  }

  return (
    <div className="application">
      <Head>
        <title>Declaration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!inMemoryJWT &&
        <div className="container">
          <AuthenticationWall />
        </div>
      }

      {inMemoryJWT &&
        <>
          <div className="side-navigation-wrapper">
            <SideNavigation />
          </div>
          <div className="container">
            <div className="scroller">
              <Component {...pageProps} />
            </div>
          </div>
        </>
      }

      <style jsx>{`
        .application {
          width: 100%;
          height: 100%;
          background: var(--light-gray);
          display: flex;
          flex-flow: row;
          font-family: var(--font-family-sans-serif);
        }

        .side-navigation-wrapper {
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .container {
          border-radius: var(--border-radius);
          margin-top: 20px;
          margin-right: 20px;
          margin-bottom: 20px;
          margin-left: 20px;
          background: white;
          flex: 1;
          box-shadow: var(--box-shadow);
          overflow: auto;
        }

        .scroller {
          overflow: auto;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

const getJWT = (ctx) => {
  let jwt = '';
  if (ctx && ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
    const { req: request } = ctx;
    const cookies = cookie.parse(request.headers.cookie || '');
    jwt = cookies[JWT_COOKIE_KEY];
  }

  return jwt;
};

Application.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const jwt = getJWT(appContext.ctx);

  return {
    ...appProps,
    jwt,
  }
}

export default withUrqlClient((_, ctx) => {
  return {
    url: process.env.HASURA_BASE_URL,
    fetchOptions: () => ({
      headers: {
        Authorization: `Bearer ${inMemoryJWT}`,
      },
    }),
    fetch,
  };
})(Application);
