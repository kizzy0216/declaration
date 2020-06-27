import { useRef } from 'react';

import useWindowScrollPosition from '~/shared/hooks/useWindowScrollPosition';
import useIsomorphicLayoutEffect from '~/shared/hooks/useIsomorphicLayoutEffect';

function ImageBreakSection({
  imgSrc,
  maxWidthType = 'inner', // normal, inner, outer
  parallaxMultiplier = 0.3,
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
        <img
          src={imgSrc}
          onLoad={handleImageLoad}
        />
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
