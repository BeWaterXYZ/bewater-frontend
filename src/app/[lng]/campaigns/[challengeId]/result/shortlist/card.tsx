import Image from "next/image";

export default function Card(props: {
  title: string;
  description: string;
  headerImage: string;
  teamName: string;
  avatars: string[];
  url: string;
}) {
  const { title, description, headerImage, teamName, avatars, url } = props;
  return (
    <div className="border border-[#24254E] rounded bg-[#0B0C24] flex w-[596px]">
      <div className="w-[280px] h-[216px]">
        <Image
          className="w-[280px] h-[216px] object-cover"
          alt={title}
          src={headerImage}
          width={280}
          height={216}
        />
      </div>
      <div className="p-4 justify-between flex w-[316px] flex-col items-start h-[216px]">
        <div className="text-[20px] leading-[32px] pt-1 text-[#FFF] truncate w-full text-left">
          {title}
        </div>
        <div className="text-sm text-[#FFFFFF80] w-full h-[60px] leading-[20px] text-left line-clamp-3">
          {description}
        </div>
        <div className="flex flex-col items-start relative w-full">
          <div className="text-[#FFF] mb-2 text-sm leading-[20px]">
            {teamName}
          </div>
          <div className="flex">
            {avatars.map((avatar, i) => (
              <Image
                key={i}
                className="-mr-2"
                alt="icon"
                src={avatar}
                width={32}
                height={32}
                style={{
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>
          <a href={url}>
            <div className="absolute border-[#2F3153] text-[#FFF] border-[1px] radius-[2px] right-0 bottom-0 px-4 py-2 text-xm leading-[20px]">
              Visit
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
