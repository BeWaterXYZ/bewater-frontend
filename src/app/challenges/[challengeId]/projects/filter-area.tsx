'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegments,
} from 'next/navigation';
import { useQueryBuilder } from './query';

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
  let { toggle, isOn } = useQueryBuilder();

  let onToggle = (key: string, value: string) => () => {
    toggle(key, value);
  };

  return (
    <div className="w-64 text-left">
      <div className="body-2 mb-4">Filter</div>
      <div className="my-2">
        <p className="body-3 uppercase my-3 ">Status</p>
        <div>
          <label className="body-3 flex items-center my-1">
            <input
              className="m-1"
              type="checkbox"
              checked={isOn('status', 'WIP')}
              onChange={onToggle('status', 'WIP')}
            ></input>
            WIP
          </label>
        </div>
        <div>
          <label className="body-3 flex items-center  my-1">
            <input
              className="m-1"
              type="checkbox"
              checked={isOn('status', 'finished')}
              onChange={onToggle('status', 'finished')}
            ></input>
            Finished
          </label>
        </div>
      </div>

      <div className="my-2">
        <p className="body-3 uppercase my-3">Tags</p>
        <div>
          <label className="body-3 flex items-center  my-1">
            <input
              className="m-1"
              type="checkbox"
              checked={isOn('tag', 'GameFi')}
              onChange={onToggle('tag', 'GameFi')}
            ></input>
            GameFi
          </label>
        </div>
        <div>
          <label className="body-3 flex items-center  my-1">
            <input
              className="m-1"
              type="checkbox"
              checked={isOn('tag', 'SocialFi')}
              onChange={onToggle('tag', 'SocialFi')}
            ></input>
            SocialFi
          </label>
        </div>
      </div>
    </div>
  );
}
