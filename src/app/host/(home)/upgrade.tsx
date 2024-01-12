export default function Upgrade() {
  return (
    <div className="bg-[#25263C] w-[262px] mb-4 ml-2 py-[20px] px-4 rounded-lg relative">
      <div className="absolute top-2 right-2">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 13L13 23M13 13L23 23"
            stroke="#98A2B3"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-semibold text-sm text-white mb-1">Used space</p>
      <p className="text-sm text-[#F1F5F9] mb-4">
        Your team has used 80% of your available space. Need more?
      </p>
      <div className="w-[230px] h-2 rounded bg-[#EAECF0]"></div>
      <div className="w-[191.76px] h-2 rounded bg-[#00FFFF] relative top-[-8px] mb-2"></div>
      <div>
        <button className="font-semibold text-sm text-[#F1F5F9] mr-3">
          Dismiss
        </button>
        <button className="font-semibold text-sm text-[#00FFFF]">
          Upgrade plan
        </button>
      </div>
    </div>
  );
}
