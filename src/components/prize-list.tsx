type PrizeListProps = {
  title: string;
};

export default function PrizeList({ title }: PrizeListProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-7 items-center">
      <p className="body-3 md:body-2 uppercase text-[#00cccc] md:text-[#00cccc]">
        {title}
      </p>
      <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
        <div className="flex flex-col gap-1 w-full">
          <p className="body-3 ">一等奖</p>
          <div className="flex flex-row justify-between">
            <p className="body-3 text-white/60">$2,500</p>
            <p className="body-3 text-white/60">x1</p>
          </div>
        </div>
        <hr className="border-none bg-white/20 h-[0.5px] w-full" />
        <div className="flex flex-col gap-1 w-full">
          <p className="body-3 ">二等奖</p>
          <div className="flex flex-row justify-between">
            <p className="body-3 text-white/60">$2,500</p>
            <p className="body-3 text-white/60">x1</p>
          </div>
        </div>
        <hr className="border-none bg-white/20 h-[0.5px] w-full" />
        <div className="flex flex-col gap-1 w-full">
          <p className="body-3 ">三等奖</p>
          <div className="flex flex-row justify-between">
            <p className="body-3 text-white/60">$2,500</p>
            <p className="body-3 text-white/60">x1</p>
          </div>
        </div>
      </div>
    </div>
  );
}
