import Link from 'next/link';

import { useAuthStore } from '@/stores/auth';

import { UserMenu } from './menu';


export default function UserArea() {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const user = useAuthStore((s) => s.user);
  return !isAuthed() ? (
    <Link href="/connect">
      <a className="btn btn-primary">Connect</a>
    </Link>
  ) : (
    <UserMenu user={user} />
  );
}
