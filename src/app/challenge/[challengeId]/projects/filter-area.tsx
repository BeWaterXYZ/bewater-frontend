'use client';

import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from 'next/navigation';

{
  /* <button
        onClick={() => {
          router.push(pathname + '?status=finished');
        }}
      >
        finished
      </button> */
}

export function FilterArea() {
  let router = useRouter();
  let segments = useSelectedLayoutSegments();
  console.log({ segments });

  const pathname = usePathname();
  console.log({ pathname });

  return (
    <div className="w-64 text-left">
      <div className="body-2">Filter</div>
      <div className="my-2">
        <p className="body-3 uppercase ">Status</p>
        <div>
          <label className="body-3 flex items-center">
            <input className="m-1" type="checkbox"></input>
            WIP
          </label>
        </div>
        <div>
          <label className="body-3 flex items-center">
            <input className="m-1" type="checkbox"></input>
            Finished
          </label>
        </div>
      </div>

      <div className="my-2">
        <p className="body-3 uppercase">Tags</p>
        <div>
          <label className="body-3 flex items-center">
            <input className="m-1" type="checkbox"></input>
            GameFi
          </label>
        </div>
        <div>
          <label className="body-3 flex items-center">
            <input className="m-1" type="checkbox"></input>
            SocialFi
          </label>
        </div>
      </div>
    </div>
  );
}
