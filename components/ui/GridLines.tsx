export function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      <div className="grid-lines-inner">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}
