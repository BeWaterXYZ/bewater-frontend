import Image from "next/image";

type CellProps = {
  src: string;
};

export default function SponsorsCell({ src }: CellProps) {
  return (
    <div className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3">
      <Image
        src={src}
        className="h-8 md:h-10 w-fit"
        alt="Sponsors"
        height={32}
        width={0}
      />
    </div>
  );
}
