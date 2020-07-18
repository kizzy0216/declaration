import Head from 'next/head';

import Footer from '~/components/Footer';

function ContactPage() {
  return (
    <div className="contact-page">
      <Head>
        <title>Contact — Declaration</title>
      </Head>

      <main>
        <h1>
          Contact us
        </h1>

        <p>
          Declaration is a fluid, dynamic and ever-evolving site. We rely on
          the input of members and casual visitors alike in order to help us
          ensure the archive grows in the right direction and serves the greatest
          good.
        </p>
        <p>
          If you have any questions or comments or are interested in
          partnering with us, please let us know by emailing us at&nbsp;
          <a
            className="underline"
            href="mailto:hi@declaration.net"
          >
            hi@declaration.net
          </a>.
        </p>
        <p>
          Your feedback is greatly appreciated.
        </p>
      </main>

      <Footer />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .contact-page {
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
          max-width: 50ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 20px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default ContactPage;
