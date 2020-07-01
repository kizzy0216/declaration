import Head from 'next/head';

import NetworkAccessRequestForm from '~/components/NetworkAccessRequestForm';
import Footer from '~/components/Footer';

function RequestNetworkPage() {
  return (
    <div className="request-network-page">
      <Head>
        <title>Request — Declaration</title>
      </Head>

      <main>
        <h1>Want to create your own networking space?</h1>
        <p>
          Declaration is a fluid, dynamic and ever-evolving private networking
          platform. Fill out the form below and a representative will contact
          you about the status of your networking space soon.
        </p>

        <div className="form-wrapper">
          <NetworkAccessRequestForm />
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

export default RequestNetworkPage;
