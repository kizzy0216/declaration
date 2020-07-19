import Head from 'next/head';

import Footer from '~/components/Footer';

function CopyrightPage() {
  return (
    <div className="copyright-page">
      <Head>
        <title>Copyright — Declaration</title>
      </Head>

      <main>
        <h1>
          Copyright
        </h1>

        <div className="container">
          <p>
            We at Declaration respect the rights of artists and creators and
            hope you will work with us to keep our community a creative, legal
            and positive experience for everyone.
          </p>
          <h2>
            What Is copyright infringement?
          </h2>
          <p>
            Copyright infringement occurs when a copyrighted work is
            reproduced, distributed, performed, publicly displayed, or made
            into a derivative work without the permission of the copyright
            owner. Posting copyright-infringing content can lead to the
            termination of your account, and possibly monetary damages if a
            copyright owner decides to take legal action.
          </p>
          <h2>
            How do I make sure my content does not infringe someone else’s
            copyrights?
          </h2>
          <p>
            The best way to ensure that your content doesn't infringe someone
            else's copyright is to be sure that all components of your content
            are your original creation. For example, if you use an audio track of
            a sound recording owned by a record label without that record label's
            permission, your content may be infringing the copyrights of others, and
            may be subject to removal.
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .copyright-page {
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

export default CopyrightPage;
