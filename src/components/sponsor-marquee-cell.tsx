type CellProps = {
  src: string;
};

export default function SponsorsCell({ src }: CellProps) {
  return (
    <div className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3">
      <img src={src} className="h-8 md:h-10" />
    </div>
  );
}
