import Card from "./card";

const testData = {
  title: "Lumiterra",
  description:
    "Lumiterra is a brand-new, multiplayer, open-world survival crafting game where you can battle, farm with your friends or mysterious collected creatures in a vast world!",
  headerImage:
    "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
  teamName: "TickerLogic.io",
  teamAvatar:
    "https://document.intra-mart.jp/library/bis/public/bis_designer_help/_images/display13.png",
  url: "https://google.com",
};

export default function Page() {
  return (
    <div className="container-xl mt-[40px] text-center flex flex-col items-center">
      <div>
        <div className="w-[320px] h-[40px] flex text-[#64748B]">
          <div className="flex-1 border-[1px] border-[#64748B] flex items-center justify-center">
            Award
          </div>
          <div className="flex-1 border-[1px] border-[#00FFFF] text-[#00FFFF] flex items-center justify-center">
            Shortlist
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <svg
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dii_5857_149513)">
              <path
                d="M32.5 22L33.9142 30.5858L42.5 32L33.9142 33.4142L32.5 42L31.0858 33.4142L22.5 32L31.0858 30.5858L32.5 22Z"
                fill="#00FFFF"
              />
              <path
                d="M32.5 26.3949L33.2094 30.7019C33.2592 31.004 33.496 31.2408 33.7981 31.2906L38.1051 32L33.7981 32.7094C33.496 32.7592 33.2592 32.996 33.2094 33.2981L32.5 37.6051L31.7906 33.2981C31.7408 32.996 31.504 32.7592 31.2019 32.7094L26.8949 32L31.2019 31.2906C31.504 31.2408 31.7408 31.004 31.7906 30.7019L32.5 26.3949Z"
                stroke="#00FFFF"
                stroke-width="1.42857"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <div className="text-base text-[#FFF] mr-6">
            18 teams were shortlisted and entered the final selection
          </div>
        </div>
        <div
          className="w-full h-[1px]"
          style={{
            background: "linear-gradient(135deg, #01DCBA 0%, #7F30CB 100%)",
          }}
        />
      </div>
      <div className="gap-[56px] grid mt-[56px]">
        <div className="flex flex-col items-center gap-[40px]">
          <div className="text-[#FFF] text-3xl/10">On-Chain Innovation</div>
          <div className="grid grid-cols-2 gap-6">
            <Card {...testData} />
            <Card {...testData} />
            <Card {...testData} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[40px]">
          <div className="text-[#FFF] text-3xl/10">Student Innovation</div>
          <div className="grid grid-cols-2 gap-6">
            <Card {...testData} />
            <Card {...testData} />
            <Card {...testData} />
          </div>
        </div>
      </div>
    </div>
  );
}
