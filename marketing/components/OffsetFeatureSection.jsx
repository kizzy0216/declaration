import { useRef, useEffect, useState } from 'react';

import useWindowLoad from '~/shared/hooks/useWindowLoad';
import useWindowScrollPosition from '~/shared/hooks/useWindowScrollPosition';
import useIsomorphicLayoutEffect from '~/shared/hooks/useIsomorphicLayoutEffect';

function OffsetFeatureSection({
  imgSrc,
  heading,
  subHeading,
  offsetX = '-100%',
  parallaxMultiplier = 0.2,
}) {
  const { y } = useWindowScrollPosition();
  const hasWindowLoaded = useWindowLoad();

  const transformElementRef = useRef(null);
  const [initialY, setInitialY] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [translateY, setTranslateY] = useState('0px');

  useIsomorphicLayoutEffect(() => {
    const dimensions = transformElementRef.current.getBoundingClientRect();
    setInitialY(dimensions.top + y);
    setInitialHeight(dimensions.height);
  }, [hasWindowLoaded]);

  useEffect(() => {
    if (hasWindowLoaded) {
      const delta = y - initialY + initialHeight;
      setTranslateY(`${(-delta) * parallaxMultiplier}px`);
    }
  }, [initialY, hasWindowLoaded, y]);

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
