import clsx from "clsx";
import { CardStyle } from "./summary";

function IconRise() {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.49991 0.37501C2.49991 0.167898 2.6678 0 2.87492 0H5.62499C5.8321 0 6 0.167898 6 0.37501V3.12508C6 3.33219 5.8321 3.50009 5.62499 3.50009C5.41788 3.50009 5.24998 3.33219 5.24998 3.12508V1.28038L0.640186 5.89032C0.493738 6.03677 0.256295 6.03677 0.109842 5.89032C-0.0366108 5.74388 -0.0366144 5.50643 0.109834 5.35998L4.71966 0.75002H2.87492C2.6678 0.75002 2.49991 0.582122 2.49991 0.37501Z"
        fill="#29CC6A"
      />
    </svg>
  );
}

function IconFlat() {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5C2 4.75147 2.20147 4.55 2.45 4.55L7.72218 4.55L5.74994 2.78536C5.56472 2.61965 5.54892 2.33516 5.71464 2.14995C5.88035 1.96473 6.16484 1.94893 6.35005 2.11465L9.20005 4.66464C9.29546 4.75001 9.34999 4.87197 9.34999 5C9.34999 5.12802 9.29546 5.24999 9.20005 5.33536L6.35005 7.88535C6.16484 8.05107 5.88035 8.03527 5.71464 7.85005C5.54892 7.66484 5.56472 7.38036 5.74994 7.21464L7.72218 5.45L2.45 5.45C2.20147 5.45 2 5.24853 2 5Z"
        fill="#0099FF"
      />
    </svg>
  );
}

export default function MetricCard(props: {
  title: string;
  current?: number;
  previous?: number;
}) {
  const current = props.current ?? 0;
  const diff = current - (props.previous ?? 0);
  return (
    <div className={`${CardStyle} w-[23.5%] py-[20px] px-[15px]`}>
      <div className="text-xxs leading-[12px] text-[#B6B6B6]">
        {props.title}
      </div>
      <div className="text-3xl text-bold leading-[40px] mt-[12px] mb-[12px]">
        {props.current}
      </div>
      <div className="flex text-xxs leading-[12px]">
        <p
          className={clsx(
            "mr-[6px] rounded-[1000px] border-[0.5px] flex justify-center items-center h-[12px] w-[24px]",
            diff > 0
              ? "border-[#29CC6A]/20 bg-[#29CC6A]/10"
              : "border-[#65A9FF]/20 bg-[#65A9FF]/10"
          )}
        >
          {diff > 0 ? <IconRise /> : <IconFlat />}
        </p>
        <p
          className={clsx(
            "mr-[6px]",
            diff > 0 ? "text-[#29CC6A]" : "text-[#65A9FF]"
          )}
        >
          {diff}
        </p>
        <p className="text-[#B6B6B6]">this month</p>
      </div>
    </div>
  );
}
