import type { UserLocalStorage } from './user';

export type Auth = {
  headers: {
    Authorization: Bearer;
  };
  user: UserLocalStorage;
};

export type Bearer = string;
export type UserID = string;
export type WalletAddress = string;
