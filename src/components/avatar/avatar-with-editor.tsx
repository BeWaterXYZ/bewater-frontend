'use client';
import clsx from 'clsx';

import { Avatar } from '@/components/avatar';
import { ChangeEventHandler } from 'react';
import { uploadFile } from '@/services/ipfs';
import { useMutationUpdateUserProfile } from '@/services/user.query';
import { useLoadingStoreAction } from '../loading/store';

interface Props {
  src?: string;
  walletAddress?: string;
  className?: string;
}

export const AvatarWithEditor = ({ src, walletAddress, className }: Props) => {
  const mutaion = useMutationUpdateUserProfile();
  const { showLoading, dismissLoading } = useLoadingStoreAction();

  const onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    let file = e.target.files?.[0];
    if (!file) return;
    try {
      showLoading();
      const formData = new FormData();
      formData.append('avatar', file);
      let res = await uploadFile(formData);
      await mutaion.mutateAsync({
        avatarURI: `ipfs://${res.cid}`,
      });
    } catch (err) {
      console.error(err);
    } finally {
      dismissLoading();
    }
  };
  return (
    <div
      className={clsx(
        'inline-flex flex-col gap-y-4 items-center h-auto w-[216px]',
        className,
      )}
    >
      <Avatar src={src} className="w-48 h-48" walletAddress={walletAddress} />
      <label htmlFor="upload" className="btn btn-secondary">
        <span aria-hidden="true">Change</span>
        <input
          type="file"
          id="upload"
          name="avatar"
          className="hidden"
          onChange={onFileSelect}
        />
      </label>
    </div>
  );
};
