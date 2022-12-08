import { useToastStore } from '@/components/toast/store';

import type { NextPage } from 'next';

const PageIndex: NextPage = () => {
  const add = useToastStore((s) => s.add);
  const clear = useToastStore((s) => s.clear);
  return (
    <div className="flex flex-col justify-center items-center">
      <p>index</p>

      <button
        className="btn btn-primary"
        onClick={() => {
          add({ title: 'test', description: 'this is description' });
        }}
      >
        add toast
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          clear();
        }}
      >
        remove all toast
      </button>
    </div>
  );
};

export default PageIndex;
