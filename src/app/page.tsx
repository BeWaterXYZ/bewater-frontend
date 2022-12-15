import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="text-center h-[400px] flex justify-center items-center ">
        <Link href="/challenges" className="body-2 ">
          点我去看看 challenge 吧
        </Link>
      </div>
    </div>
  );
}
