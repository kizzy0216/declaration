import { useRef, useEffect, useState } from 'react';

import useWindowLoad from '~/shared/hooks/useWindowLoad';
import useWindowScrollPosition from '~/shared/hooks/useWindowScrollPosition';
import useIsomorphicLayoutEffect from '~/shared/hooks/useIsomorphicLayoutEffect';

function ImageBreakSection({
  imgSrc,
  maxWidthType = 'inner', // normal, inner, outer
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

  const maxWidth = (() => {
    switch(maxWidthType) {
    case 'inner':
      return '--max-width-inner';
    case 'normal':
      return '--max-width';
    case 'outer':
      return '--max-width-outer';
    }
  })();

  return (
    <section className="image-break-section">
      <div
        className="container"
        ref={transformElementRef}
        style={{
          transform: `translateY(${translateY})`,
        }}
      >
        <img src={imgSrc} />
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        .image-break-section {
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
          top: 100%;
          width: 100%;
          max-width: var(${maxWidth});
          margin-left: auto;
          margin-right: auto;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

export default ImageBreakSection;
