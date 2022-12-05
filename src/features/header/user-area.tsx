import Link from 'next/link';

import { UserMenu } from './user-menu';

import type { User } from '@/stores/auth';


interface UserAreaProps {
  isAuthed: boolean;
  user: User;
}

export default function UserArea({ isAuthed, user }: UserAreaProps) {
  return !isAuthed ? (
    <Link href="/connect">
      <a className="btn btn-primary">Connect Wallet</a>
    </Link>
  ) : (
    <UserMenu user={user} />
  );
}
