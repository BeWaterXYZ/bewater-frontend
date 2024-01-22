import Image from "next/image";
import BookIcon from "./book-icon";
import CodeBoxIcon from "./code-box-icon";
import { ProjectData } from "../data/type";
import project from "../data/project.json";

function Project(props: { data: ProjectData; rank: number }) {
  const avatar =
    "w-6 h-6 rounded-full border-[#515151] border-[1px] bg-[#456789] overflow-hidden";
  const { data, rank } = props;
  const [owner, repo] = data.repoName.split("/");
  const contributors = data.contributors.slice(0, 5);
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-6 items-center">
      <div className="flex items-center">
        <p className="font-bold text-[16px] leading-[21px] text-white mr-6">
          #{rank}
        </p>
        <div>
          <a href={`https://github.com/${data.repoName}`}>
            <div className="flex items-center font-bold text-[16px] leading-[21px] mb-3 ">
              <div className="text-[#B4B4BB] mr-[10px]">
                <BookIcon />
              </div>
              <span className="text-[#FFFFFFB3] mr-[10px] line-clamp-1">
                {owner}
              </span>
              <span className="text-white mr-[10px]">/</span>
              <span className="text-white line-clamp-1">{repo}</span>
            </div>
          </a>
          <p className="text-[11px] leading-[15px] text-[#64748B] line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>
      <div className="text-xs">
        <div className="flex items-center mb-[6px]">
          <div className="text-[#919191] mr-1">
            <CodeBoxIcon />
          </div>
          <span className="text-white">{data.language ?? "N/A"}</span>
        </div>
        <div className="text-[#94A3B8] mb-[6px]">
          <span className="mr-[20px]">Stars: {data.stargazers_count}</span>
          <span>Fork: {data.forks_count}</span>
        </div>
        {/* <p className="text-white">Token & NFT, DeFi</p> */}
      </div>
      <div className="w-[276.67px]">
        <div className="flex justify-end gap-[6px] mb-[6px]">
          {contributors.map((contributor, i) => (
            <a href={`https://github.com/${contributor.login}`} key={i}>
              <div className={avatar}>
                <Image
                  alt={contributor.login}
                  src={contributor.avatar_url}
                  width={24}
                  height={24}
                />
              </div>
            </a>
          ))}
        </div>
        <div className="text-xs text-white text-right">
          {/* Updated on Jan 18, 2024 */}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const projectList = project.slice(0, 50);
  return (
    <div className="w-[900px] flex flex-col gap-[24px] font-secondary">
      {projectList.map((data, index) => (
        <Project data={data} rank={index + 1} key={index} />
      ))}
    </div>
  );
}
