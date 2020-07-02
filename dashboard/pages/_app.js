import Head from 'next/head';
import Link from 'next/link';
import { createClient, Provider as UrqlProvider } from 'urql';

// import App from 'next/app'

import '~/shared/styles/variables.css';
import '~/shared/styles/base.css';

import SideNavigation from '~/components/SideNavigation';

const client = createClient({
  url: process.env.API_BASE_URL,
});

function Application({ Component, pageProps }) {
  return (
    <div className="application">
      <Head>
        <title>Declaration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="side-navigation-wrapper">
        <SideNavigation />
      </div>
      <div className="container">
        <div className="scroller">
          <UrqlProvider value={client}>
            <Component {...pageProps} />
          </UrqlProvider>
        </div>
      </div>

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
