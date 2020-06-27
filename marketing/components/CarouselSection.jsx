import Carousel from '~/components/Carousel';

function CarouselSection({
  heading,
  items = [],
}) {
  return (
    <section className="carousel-section">
      <div className="container">
        <h1>{heading}</h1>
        <Carousel items={items} />
      </div>

      <style jsx>{`
        @import 'shared/styles/media.css';

        .carousel-section {
          padding-top: 110px;
          padding-bottom: 110px;
          background: var(--light-gray);
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          font-size: 50px;
          padding-left: 20px;
          padding-right: 20px;

          @media (--medium) {
            font-size: 36px;
          }

          @media (--small) {
            font-size: 45px;
            max-width: 20ch;
          }
        }
      `}</style>
    </section>
  );
}

export default CarouselSection;
