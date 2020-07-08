import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

function NetworkIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/networks/[networkId]/members', `/networks/${router.query.networkId}/members`);
  }, []);

  return (
    <div className="network-index-page">
      <Head>
        <title>Dashboard — Declaration</title>
      </Head>
    </div>
  )
}

NetworkIndexPage.getInitialProps = ({ res, query }) => {
  if (res) {
    res.writeHead(302, {
      Location: `/networks/${query.networkId}/members`,
    });
    res.end();
  }

  return {};
}

export default NetworkIndexPage;
