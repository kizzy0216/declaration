import { useRef } from 'react';

import useWindowScrollPosition from '~/shared/hooks/useWindowScrollPosition';
import useIsomorphicLayoutEffect from '~/shared/hooks/useIsomorphicLayoutEffect';

function OffsetFeatureSection({
  imgSrc,
  heading,
  subHeading,
  offsetX = '-100%',
  parallaxMultiplier = 0.2,
}) {
  const transformElementRef = useRef(null);
  const initialDimensions = useRef(0);
  const { y } = useWindowScrollPosition();

  useIsomorphicLayoutEffect(() => {
    initialDimensions.current = transformElementRef.current.getBoundingClientRect();
  }, []);

  let translateY = 0;
  if (transformElementRef.current) {
    const delta = y - initialDimensions.current.top + initialDimensions.current.height;
    translateY = `-${(delta) * parallaxMultiplier}px`;
  }

  function handleImageLoad() {
    initialDimensions.current = transformElementRef.current.getBoundingClientRect();
  }

  return (
    <section className="offset-feature-section">
      <div
        className="container"
        ref={transformElementRef}
        style={{
          transform: `translateY(${translateY})`,
        }}
      >
        <div className="offset-wrapper">
          <img
            src={imgSrc}
            onLoad={handleImageLoad}
          />
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
          will-change: transform;
        }

        .offset-wrapper {
          & img {
            margin-bottom: 40px;
          }

          & .sub-heading {
            margin-bottom: 20px;
            font-size: 18px;
            line-height: 1.5;
            max-width: 44ch;
          }

          & .heading {
            font-weight: bold;
            font-style: italic;
            font-size: 24px;
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
