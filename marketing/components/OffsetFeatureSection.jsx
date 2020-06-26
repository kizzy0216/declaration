function OffsetFeatureSection({
  imgSrc,
  heading,
  subHeading,
  offsetX = '-100%',
}) {
  return (
    <section className="offset-feature-section">
      <div className="container">
        <div className="offset-wrapper">
          <img src={imgSrc} />
          <p className="sub-heading">
            {subHeading}
          </p>
          <p className="heading">
            <em>{heading}</em>
          </p>
        </div>
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        .offset-feature-section {
          padding-top: 110px;
          padding-right: 60px;
          padding-bottom: 110px;
          padding-left: 60px;

          @media (--small) {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        .container {
          position: relative;
          width: 100%;
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }

        .offset-wrapper {
          & img {
            margin-bottom: 40px;
          }

          & .sub-heading {
            margin-bottom: 20px;
            font-size: 18px;
            line-height: 1.5;
            max-width: 55ch;
          }

          & .heading {
            font-weight: 500;
            font-size: 21px;
            line-height: 1.5;
            max-width: 30ch;
          }

          @media (--medium-up) {
            position: relative;
            left: 50%;
            width: 50%;
            transform: translateX(${offsetX});
          }
        }
      `}</style>
    </section>
  );
}

export default OffsetFeatureSection;
