export default function Page() {
  return (
    <div className="flex flex-row h-full container flex-wrap">
      <div className="w-full mt-6 flex flex-col gap-3">
        <div className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 ">
          <div>icon</div>
          <div>
            <p className="body-4 text-gray-500 font-bold">Wallet Address</p>
            <p className="body-4 text-gray-300">
              0x1234561234561234561234561234561234561234
            </p>
          </div>
        </div>

        <div className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 ">
          <div>icon</div>
          <div>
            <p className="body-4 text-gray-500 font-bold">Wallet Address</p>
            <p className="body-4 text-gray-300">
              0x1234561234561234561234561234561234561234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
