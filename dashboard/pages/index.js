import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';

import SpinnerIcon from '~/shared/components/icons/SpinnerIcon';
import { UserContext } from '~/contexts/UserContext';

function IndexPage() {
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);
  const {
    user,
    hasFetched,
  } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (hasFetched) {
      if (user.isSuperAdmin) {
        router.replace('/networks');
      } else {
        const firstNetworkId = user.networkIds[0];
        if (firstNetworkId) {
          router.replace(`/networks/${firstNetworkId}`);
        }
      }
    }

    setTimeout(() => setIsSpinnerActive(true), 1000);
  }, [hasFetched]);

  return (
    <div className="index-page">
      <Head>
        <title>Dashboard — Declaration</title>
      </Head>

      {!hasFetched && isSpinnerActive &&
        <SpinnerIcon />
      }

      <style jsx>{`
        .index-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 64px;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default IndexPage;
