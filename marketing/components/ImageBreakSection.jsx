function ImageBreakSection({
  imgSrc,
  maxWidthType = 'inner', // normal, inner, outer
}) {
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
      <div className="container">
        <img src={imgSrc} />
      </div>

      <style jsx>{`
        @import 'declaration-interface/build/styles/media.css';

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
          width: 100%;
          max-width: var(${maxWidth});
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </section>
  );
}

export default ImageBreakSection;
