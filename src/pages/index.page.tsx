import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageIndex: NextPage = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      Index Page
    </div>
  );
};

export default PageIndex;
