import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL;

import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';
import LogInForm from '~/shared/components/LogInForm';
import Footer from '~/components/Footer';
import { fetchREST } from '~/utils/api';

function LogInPage({ user }) {
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { query } = router;

  if (user.uuid) {
    router.push('/');
  }

  useEffect(() => {
    if (query.email && query.code) {
      setIsFetching(true);
      fetchREST('/authenticate', {
        method: 'POST',
        body: JSON.stringify({
          email: query.email,
          code: query.code,
        }),
      }).then(() => {
        setIsFetching(false);
        setHasFetched(true);

        window.location = DASHBOARD_BASE_URL;
      });
    }
  }, [query.email, query.code]);

  function handleSubmit({ email }) {
    setIsFetching(true);

    fetchREST('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    }).then(() => {
      setIsFetching(false);
      setHasFetched(true);
    });
  }

  return (
    <div className="log-in-page">
      <Head>
        <title>Log In — Declaration</title>
      </Head>

      <main>
        {!(query.code && query.email) &&
          <>
            <h1>
              {(
                !isFetching && hasFetched
                  ? 'Check your email for next steps'
                  : 'Log In'
              )}
            </h1>

            {!hasFetched &&
              <div className="form-wrapper">
                <LogInForm
                  isFetching={isFetching}
                  error={error}
                  onSubmit={handleSubmit}
                />
              </div>
            }
          </>
        }

        {query.code && query.email &&
          <div className="redirect">
            <h1>
              Logging In...
            </h1>

            <div className="icon-wrapper">
              <SpinnerIcon />
            </div>
          </div>
        }
      </main>

      <Footer withLinkToContact={false} />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .log-in-page {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          min-height: 100%;
        }

        main {
          display: flex;
          flex-flow: column;
          flex: 1;
          padding-top: 150px;
          padding-left: 20px;
          padding-right: 20px;
        }

        @media (--small) {
          main {
            padding-top: 100px;
          }
        }

        h1 {
          max-width: 30ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 35px;
          text-align: center;
        }

        .form-wrapper {
          width: 100%;
          max-width: 44ch;
          margin-left: auto;
          margin-right: auto;
        }

        .redirect {
          flex:1;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;

          & .icon-wrapper {
            font-size: 32px;
          }
        }
      `}</style>
    </div>
  );
}

export default LogInPage;