function GalleryGridSection({
  items = [],
}) {
  return (
    <section className="gallery-grid-section">
      <div className="container">
        {items.map((item) => (
          <img
            src={item}
            key={item}
          />
        ))}
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        .gallery-grid-section {
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
          width: 100%;
          max-width: var(--max-width-outer);
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 50px;

          @media (--small) {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default GalleryGridSection;
