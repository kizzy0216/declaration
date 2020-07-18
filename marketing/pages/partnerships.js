import Head from 'next/head';

import Footer from '~/components/Footer';

function PartnershipsPage() {
  return (
    <div className="privacy-page">
      <Head>
        <title>Partnerships — Declaration</title>
      </Head>

      <main>
        <h1>
          Partnerships
        </h1>

        <div className="container">
          <p>
            At this point, Declaration is in its infancy. We're still figuring
            out just how powerful a tool it can be and how best it can serve
            our members and the public at large. If you have some ideas and are
            interested in partnering with us in a manner that respects our members
            and their work without seeking to exploit either, please email us at&nbsp;
            <a
              className="underline"
              href="mailto:partnerships@declaration.net"
            >
              partnerships@declaration.net
            </a>
            &nbsp;and let’s get a conversation going.
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .partnerships-page {
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

        .container {
          max-width: 50ch;
          margin-left: auto;
          margin-right: auto;
        }

        h1 {
          max-width: 30ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 35px;
          text-align: center;
        }

        h2 {
          margin-bottom: 15px;
        }

        p {
          margin-bottom: 20px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default PartnershipsPage;
