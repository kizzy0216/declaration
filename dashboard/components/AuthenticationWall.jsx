import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';
import LogInForm from '~/shared/components/LogInForm';
import { fetchREST } from '~/utils/api';

function AuthenticationWall() {
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState('');
  const { query } = useRouter();

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

        window.location.replace(location.pathname);
      });
    }
  }, [query.email, query.code]);

  function handleSubmit({ email }) {
    setIsFetching(true);

    fetchREST('/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email,
        redirect: 'http://localhost:55000', // TODO
      }),
    }).then(() => {
      setIsFetching(false);
      setHasFetched(true);
    });
  }

  return (
    <div className="authentication-wall">
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

      <style jsx>{`
        @import 'shared/styles/media.css';

        .authentication-wall {
          display: flex;
          flex-flow: column;
          justify-content: center;
          min-height: 100%;
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

export default AuthenticationWall;
