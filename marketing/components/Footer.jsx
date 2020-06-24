import Link from 'next/link';

function Footer({
  withLinkToContact = true,
}) {
  return (
    <footer>
      <div className="container">
        { withLinkToContact &&
          <h3>
            Questions?&nbsp;
            <Link href="/contact">
              <a className="link">Say hi.</a>
            </Link>
          </h3>
        }

        <p>
          Created in Brooklyn, New York.
        </p>
      </div>

      <style jsx>{`
        footer {
          min-height: 33vh;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding-left: 20px;
          padding-right: 20px;

          @media (--small) {
            align-items: flex-start;
          }
        }

        h3 {
          font-size: 40px;
          margin-bottom: 30px;

          @media (--small) {
            font-size: 20px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
