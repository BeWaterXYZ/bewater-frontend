import { CardStyle } from "./summary";

export default function Activity(props: {
  description: string;
  dateDistance: string;
}) {
  return (
    <div
      className={`${CardStyle} py-[6px] px-[15px] flex text-sm leading-[20px]`}
    >
      <p className="flex-1">{props.description}</p>
      <p className="opacity-70">{props.dateDistance} ago</p>
    </div>
  );
}
