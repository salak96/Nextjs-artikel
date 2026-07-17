const MainPostItemMobileLoading = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-4 px-5 py-10 md:hidden">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full animate-pulse rounded-xl border border-border bg-card">
          <div className="h-48 w-full rounded-t-xl bg-muted" />
          <div className="space-y-3 p-4">
            <div className="flex gap-3">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
            <div className="h-5 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="flex items-center gap-3 pt-2">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="h-2 w-14 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPostItemMobileLoading;
