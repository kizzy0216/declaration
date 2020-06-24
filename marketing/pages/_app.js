import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// import App from 'next/app'

import 'declaration-interface/build/styles/variables.css';
import 'declaration-interface/build/styles/base.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import TopNavigation from '~/components/TopNavigation';
import ActiveLink from '~/components/ActiveLink';

function Application({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Declaration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavigation
        links={[
          <ActiveLink
            activeClassName="underline"
            href="/request-network"
            key="/request-network"
          >
            <a>Request a space</a>
          </ActiveLink>,
          <ActiveLink
            activeClassName="underline"
            href="/contact"
            key="/contact"
          >
            <a>Contact us</a>
          </ActiveLink>
        ]}
      />
      <Component {...pageProps} />
    </Fragment>
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
