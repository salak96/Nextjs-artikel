const MainPostItemDesktopLoading = () => {
  return (
    <div className="mx-auto hidden max-w-7xl flex-col items-center justify-center space-y-6 md:flex">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full animate-pulse rounded-xl border border-border bg-card p-0.5">
          <div className="flex">
            <div className="h-52 w-72 shrink-0 rounded-l-xl bg-muted" />
            <div className="flex flex-1 flex-col justify-center gap-3 p-6">
              <div className="flex gap-3">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
              <div className="mt-2 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-2 w-16 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPostItemDesktopLoading;
