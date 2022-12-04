import Link from 'next/link';

import { Avatar } from '@/components/avatar';
import { UserLocalStorage } from '@/models/user';

interface UserAreaProps {
  isAuthed: boolean;
  user: UserLocalStorage;
}
export default function UserArea({ isAuthed, user }: UserAreaProps) {
  return !isAuthed ? (
    <Link href="/auth/connect-wallet">
      <a className="btn btn-primary">Connect Wallet</a>
    </Link>
  ) : (
    <Avatar
      size="small"
      src={user.avatarURI}
      walletAddress={user.walletAddress}
    />
  );
}
