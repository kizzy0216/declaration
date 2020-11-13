function NetworkKnowledgePage() {
  return (
    <>
      <div className="network-knowledge-page">
        <h1>Coming soon</h1>
      </div>
      <style jsx>{`
        .network-knowledge-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;

          & h1 {
            font-family: var(--font-family-serif);
            font-weight: 400;
            color: var(--dark);
            font-size: 60px;
          }
        }
      `}</style>
    </>
  );
}

export default NetworkKnowledgePage;
