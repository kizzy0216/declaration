function StatementSection({
  heading,
  subHeading,
}) {
  return (
    <section className={`statement-section ${subHeading ? 'two-up' : 'one-up'}`}>
      <div className="container">
        <h2>{heading}</h2>
        {subHeading &&
          <p>{subHeading}</p>
        }
      </div>
      <style jsx>{`
        @import 'shared/styles/media.css';

        .statement-section {
          padding-top: 110px;
          padding-right: 60px;
          padding-bottom: 110px;
          padding-left: 60px;

          &.two-up {
            & .container {
              display: flex;
              flex-flow: row;
              justify-content: space-between;
              align-items: flex-start;

              @media (--small) {
                display: block;
              }
            }

            & h2 {
              max-width: 20ch;

              @media (--small) {
                max-width: 100%;
              }
            }
          }

          &.one-up {
            & h2 {
              @media (--small) {
                font-size: 40px;
              }
            }
          }

          @media (--small) {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        .container {
          width: 100%;
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }

        h2 {
          font-family: var(--font-family-serif);
          font-size: 52px;
          font-weight: 300;
          line-height: 1.2;
          width: 100%;

          @media (--large) {
            font-size: 40px;
          }

          @media (--medium-up) {
            padding-right: 10px;
          }

          @media (--small) {
            font-size: 52px;
            margin-bottom: 30px;
          }
        }

        p {
          width: 100%;
          max-width: 40ch;
          font-size: 20px;
          line-height: 1.5;

          @media (--medium-up) {
            padding-left: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default StatementSection;
