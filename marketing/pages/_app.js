import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL;

// import App from 'next/app'
import '~/shared/styles/variables.css';
import '~/shared/styles/base.css';
import '~/shared/styles/typography.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

import ActiveLink from '~/shared/components/ActiveLink';
import TopNavigation from '~/components/TopNavigation';
import { fetchREST } from '~/utils/api';

function Application({ Component, pageProps }) {
  const { pathname } = useRouter();
  const [hasSettledAuthentication, setHasSettledAuthentication] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchREST('/me', {
      method: 'GET',
    }).then(r => r.json())
      .then((user) => {
        setUser(user);
        setHasSettledAuthentication(true);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Declaration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNavigation
        isInitiallyTransparent={pathname === '/'}
        links={[
          <ActiveLink
            activeClassName="underline"
            href="/request-network"
            key="/request-network"
          >
            <a>Request a space</a>
          </ActiveLink>,
          hasSettledAuthentication && user.uuid && (
            <a
              href={DASHBOARD_BASE_URL}
              key={DASHBOARD_BASE_URL}
            >
              Dashboard
            </a>
          ),
        ].filter(x => x)}
        user={user}
        hasSettledAuthentication={hasSettledAuthentication}
      />

      <Component {...pageProps} user={user} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// Application.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default Application;
