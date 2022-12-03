import Link from 'next/link';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { UserLocalStorage } from '@/models/user';

interface UserAreaProps {
  isAuthed: boolean;
  user: UserLocalStorage;
}
export default function UserArea({ isAuthed, user }: UserAreaProps) {
  return !isAuthed ? (
    <Link href="/auth/connect-wallet" passHref>
      <Button type="primary" text="Connect Wallet" />
    </Link>
  ) : (
    <Avatar
      size="small"
      src={user.avatarURI}
      walletAddress={user.walletAddress}
    />
  );
}
