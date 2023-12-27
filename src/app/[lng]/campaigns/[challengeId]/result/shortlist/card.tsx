import Image from "next/image";

export default function Card(props: {
  title: string;
  description: string;
  headerImage: string;
  teamName: string;
  teamAvatar: string;
  url: string;
}) {
  const { title, description, headerImage, teamName, teamAvatar, url } = props;
  return (
    <div className="border border-[#24254E] rounded bg-[#0B0C24] flex w-[596px]">
      <Image alt={title} src={headerImage} width={280} height={216} />
      <div className="p-4 gap-2 flex flex-col items-start h-[216px] h-fit">
        <div className="text-[20px] leading-[32px] pt-1 text-[#FFF]">
          {title}
        </div>
        <div className="text-sm text-[#FFFFFF80] flex-1 leading-[20px] text-left h-fit">
          {description}
        </div>
        <div className="flex flex-col items-start relative w-full">
          <div className="text-[#FFF] mb-2 text-sm leading-[20px]">
            {teamName}
          </div>
          <Image
            alt="icon"
            src={teamAvatar}
            width={32}
            height={32}
            style={{
              borderRadius: "50%",
            }}
          />
          <a href={url}>
            <div className="absolute border-[#2F3153] text-[#FFF] border-[1px] radius-[2px] right-0 bottom-0 px-4 py-2 bottom-0 right-0 text-xm leading-[20px]">
              Visit
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
