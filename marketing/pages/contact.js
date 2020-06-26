import Head from 'next/head';

import ContactForm from '~/components/ContactForm';
import Footer from '~/components/Footer';

function ContactPage() {
  return (
    <div className="contact-page">
      <Head>
        <title>Contact — Declaration</title>
      </Head>

      <main>
        <h1>Questions?</h1>
        <div className="form-wrapper">
          <ContactForm />
        </div>
      </main>

      <Footer withLinkToContact={false} />

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

export default ContactPage;
