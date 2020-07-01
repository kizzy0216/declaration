function Footer({
  withLinkToContact = true,
}) {
  return (
    <footer>
      <div className="container">
        { withLinkToContact &&
          <>
            <h3>
              Questions?&nbsp;
            </h3>
            <a
              href="mailto:hi@declaration.net"
              className="link"
            >
              <h4>
                Say hi@declaration.net.
              </h4>
            </a>
          </>
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
          margin-bottom: 5px;

          @media (--small) {
            font-size: 20px;
          }
        }

        h4 {
          font-size: 20px;

          @media (--small) {
            font-size: 16px;
          }
        }

        p {
          margin-top: 20px;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
