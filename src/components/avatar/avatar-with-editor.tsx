'use client';

import { Avatar } from '@/components/avatar/avatar';
import { uploadFile } from '@/services/ipfs';
import { useMutationUpdateUserProfile } from '@/services/user.query';
import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';
import { useLoadingStoreAction } from '../loading/store';
interface Props {
  src?: string;
  walletAddress?: string;
}

export const AvatarWithEditor = ({ src, walletAddress }: Props) => {
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
  const onRemoveAvatar = async () => {
    try {
      showLoading();
      await mutaion.mutateAsync({
        avatarURI: ``,
      });
    } catch (err) {
      console.error(err);
    } finally {
      dismissLoading();
    }
  };
  return (
    <div className=" flex items-center gap-4">
      <Avatar
        src={src}
        className="w-30 h-30 lg:w-48 lg:h-48 "
        walletAddress={walletAddress}
      />
      <div className="flex flex-col gap-3">
        <label htmlFor="upload" className="btn btn-secondary">
          <Image
            src="/icons/pen.svg"
            height={12}
            width={12}
            alt="edit"
            className="mr-2"
          />
          <span aria-hidden="true">Change</span>
          <input
            type="file"
            id="upload"
            name="avatar"
            accept="image/*"
            className="hidden"
            onChange={onFileSelect}
          />
        </label>

        <button className="btn btn-secondary-invert" onClick={onRemoveAvatar}>
          <Cross1Icon className="text-white mr-2" height={12} width={12} />
          Remove
        </button>
      </div>
    </div>
  );
};
