import Head from 'next/head';

import Footer from '~/components/Footer';

function CommunityGuidelinesPage() {
  return (
    <div className="privacy-page">
      <Head>
        <title>Community guidelines — Declaration</title>
      </Head>

      <main>
        <h1>
          Community guidelines
        </h1>

        <div className="container">
          <h2>
            Respect the Declaration community
          </h2>
          <p>
            Every community feature on Declaration involves a certain level of
            trust. We ask that you respect and help foster that trust.
          </p>

          <h2>
            Use common sense
          </h2>
          <p>
            The following guidelines will help keep you from making any missteps:
          </p>
          <p>
            Declaration is not for pornography or sexually explicit content. If
            this describes your content, even if it’s content of yourself,
            please don’t post it on Declaration. Also, be advised that we work
            closely with law enforcement and report child exploitation.
          </p>
          <p>
            Don’t post content showing animal abuse, drug abuse, under-age
            drinking and smoking, or bomb making.
          </p>
          <p>
            Graphic or gratuitous violence is not allowed. If your content
            involves someone being physically hurt, attacked, or humiliated,
            please don’t post it.
          </p>
          <p>
            Declaration is not a shock site. Please don’t post content intended
            to shock or disgust.
          </p>
          <p>
            Respect copyright. Only upload content that you made or that you are
            authorized to use. Don’t upload content you didn't make or use
            material in your content that someone else owns the copyright to
            without necessary authorizations. Read our Copyright Tips for more
            information.
          </p>
          <p>
            We encourage free speech and defend everyone’s right to express
            unpopular points of view. But we don’t permit hate speech (speech
            that attacks or demeans a group based on race or ethnic origin,
            religion, disability, gender, age, veteran status, and sexual
            orientation/gender identity).
          </p>
          <p>
            Predatory behavior such as stalking, threats, harassment,
            intimidation, impersonation, invading privacy, revealing other
            people’s personal information, and inciting others to commit
            violent acts or to violate the Terms of Use are taken very
            seriously. Anyone caught doing these things may be permanently
            banned from Declaration.
          </p>
          <p>
            Please don’t generate spam by creating misleading descriptions, tags,
            titles or thumbnails or any other means in order to increase views.
            It is not okay to post large amounts of untargeted, unwanted or
            repetitive content, including comments and private messages.
          </p>
          <p>
            Please take these rules seriously and respect the spirit in which
            they were created.
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @import 'shared/styles/media.css';

        .community-guidelines-page {
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

export default CommunityGuidelinesPage;
