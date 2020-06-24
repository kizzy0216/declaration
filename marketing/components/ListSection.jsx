function ListSection({
  items = [],
}) {
  return (
    <section className="list-section">
      <div className="container">
        <ol>
          {items.map((item, index) => (
            <li key={item.heading}>
              <h3>{index + 1}. {item.heading}</h3>
              <p>{item.subHeading}</p>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{`
        @import 'declaration-interface/build/styles/media.css';

        .list-section {
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
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }

        ol {
          list-style: none;
        }

        li {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          margin-bottom: 100px;
        }

        h3 {
          font-size: 40px;
        }

        p {
          max-width: 58ch;
          font-size: 20px;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}

export default ListSection;
