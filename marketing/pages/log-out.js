import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { fetchREST } from '~/utils/api';
import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';

function LogOutPage () {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFetching(true);

    fetchREST('/log-out', {
      method: 'POST',
    }).then(r => r.json())
      .then(() => {
        window.location = "/";
      });
  }, []);

  return (
    <div className="log-out-page">
      <main>
        {isFetching &&
          <SpinnerIcon />
        }
      </main>
      <style jsx>{`
        @import 'shared/styles/media.css';

        .log-out-page {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          min-height: 100%;
        }

        main {
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          padding-top: 150px;
          padding-left: 20px;
          padding-right: 20px;
          font-size: 32px;
        }

        @media (--small) {
          main {
            padding-top: 100px;
          }
        }
      `}</style>
    </div>
  );
}

export default LogOutPage;
