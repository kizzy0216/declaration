import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from 'pure-react-carousel';

function Carousel({
  items = [],
}) {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={items.length}
      visibleSlides={2}
      infinite={true}
    >
      <Slider>
        {items.map((item, index) => (
          <Slide
            index={index}
            key={item}
          >
            <Image
              src={item}
              hasMasterSpinner={true}
            />
          </Slide>
        ))}
      </Slider>

      <div className="controls">
        <ButtonBack>
          <span className="previous">←</span>
        </ButtonBack>
        <ButtonNext>
          <span className="next">→</span>
        </ButtonNext>
      </div>

      <style jsx>{`
        .controls {
          font-size: 32px;
          text-align: center;
          padding-top: 10px;

          & .previous {
            margin-right: 10px;
          }

          & .next {
            margin-left: 10px;
          }
        }
      `}</style>
    </CarouselProvider>
  );
}

export default Carousel;
