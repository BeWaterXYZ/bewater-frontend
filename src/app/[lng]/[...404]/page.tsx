import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container relative min-h-[600px]">
      <div className="flex flex-col gap-4 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image src="/icons/404.svg" height={280} width={444} alt="not found" />
        <p className="body-1 text-[20px]">Page Not Found</p>
        <p className="body-2 text-grey-500">
          We couldn’t find the page you’re looking for.
        </p>
        <Link prefetch={false} className="btn btn-primary" href="/">
          Go back
        </Link>
      </div>
    </div>
  );
}
