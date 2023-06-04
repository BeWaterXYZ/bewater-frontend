export function Dashboard() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <div>filters</div>
        <div>
          <button className="btn btn-primary">+ Draft a new campaign</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16">
        <div>left</div>
        <div>right</div>
      </div>
    </div>
  );
}
