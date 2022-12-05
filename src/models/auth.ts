import { User } from '@/stores/auth';

export type Auth = {
  headers: {
    Authorization: Bearer;
  };
  user: User;
};

export type Bearer = string;
export type UserID = string;
export type WalletAddress = string;
