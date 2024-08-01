import clsx from "clsx";

interface Props {
  cover?: boolean;
}

export function Loading({ cover = true }: Props) {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      {cover ? (
        <div className="fixed z-[99] top-0 left-0 right-0 bottom-0 bg-black/50" />
      ) : null}
      <div
        className={clsx(
          cover
            ? "fixed z-[99] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "relative inline-block"
        )}
      >
        <div className="relative inline-block w-20 h-20" role="status">
          <div className="absolute border-4 border-solid border-day rounded-full animate-spin-ripple" />
          <div className="absolute border-4 border-solid  rounded-full animate-spin-ripple -animation-delay-500" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
