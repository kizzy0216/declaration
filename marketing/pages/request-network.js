import Head from 'next/head';
import { useMutation } from 'urql';
import { withUrqlClient } from 'next-urql';

import InsertNetworkAccessRequest from '~/mutations/InsertNetworkAccessRequest';
import NetworkAccessRequestForm from '~/components/NetworkAccessRequestForm';
import Footer from '~/components/Footer';

function RequestNetworkPage() {
  const [response, insertNetworkRequest] = useMutation(InsertNetworkAccessRequest);
  const {
    fetching: isFetching,
    error,
    data,
  } = response;

  function handleSubmit({
    name,
    email,
    communityName,
    userCountRange,
    body,
  }) {
    insertNetworkRequest({
      requester_name: name,
      requester_email: email,
      community_name: communityName,
      user_count_range: userCountRange,
      body,
    });
  }

  return (
    <div className="request-network-page">
      <Head>
        <title>Request — Declaration</title>
      </Head>

      <main>
        {data &&
          <>
            <h1>We have received your request.</h1>
            <p>Declaration's CEO will reach out as soon as possible.</p>
          </>
        }
        {!data &&
          <>
            <h1>Want to create your own networking space?</h1>
            <p>
              Declaration is a fluid, dynamic and ever-evolving private networking
              platform. Fill out the form below and a representative will contact
              you about the status of your networking space soon.
            </p>
          </>
        }

        <div className="form-wrapper">
          {!data &&
            <NetworkAccessRequestForm
              isFetching={response.fetching}
              error={response.error}
              onSubmit={handleSubmit}
            />
          }
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .request-network-page {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          min-height: 100%;
        }

        main {
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

        p {
          max-width: 55ch;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          margin-bottom: 45px;
        }

        .form-wrapper {
          width: 100%;
          max-width: 44ch;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: process.env.API_BASE_URL,
}))(RequestNetworkPage);
