import Link from 'next/link';

function IndexPageHero() {
  return (
    <section className="index-page-hero">
      <img
        src="/images/index-hero-background.jpg"
        className="background-image"
      />

      <div className="container">
        <h1>
          Declaration is a private networking app built for
          communities to convert followers into customers and enable short form
          advising. Join a network that creates positive social impact.
        </h1>
        <h2>
          Elevate your collective.&nbsp;
          <Link href="/request-network">
            <a className="link">Add your network</a>
          </Link>
          &nbsp;and&nbsp;
          <a
            className="link"
            href="https://apps.apple.com/us/app/declaration/id1079454028"
            target="_blank"
          >
            download the app
          </a>
          .
        </h2>
      </div>

      <style jsx>{`
        .index-page-hero {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          position: relative;
          color: white;
        }

        h1 {
          max-width: 44ch;
          font-size: 50px;
          margin-bottom: 20px;
        }

        h2 {
          max-width: 80ch;
          font-size: 26px;
        }

        .background-image {
          width: 100%;
          height: 100%;
          object-position: 50% 50%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          z-index: var(--z-index-bottom);
        }

        a {
          color: var(--blue);
        }
      `}</style>
    </section>
  );
}

export default IndexPageHero;
