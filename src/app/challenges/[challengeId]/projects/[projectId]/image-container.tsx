'use client';
import { Loading } from '@/components/loading/loading';
import { getStorageUpload } from '@/services/storage';
import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect } from 'react';
export type Media = {
  url?: string;
  file?: File;
  id: number;
  status: 'existing' | 'uploading' | 'uploaded' | 'failed';
};
export function ImageContainer({
  media,
  onRemove,
  onClick,
  onUploadSuccess,
  onUploadFiled,
}: {
  media: Media;
  onRemove?: (id: number) => void;
  onUploadSuccess: (id: number, url: string) => void;
  onUploadFiled: (id: number) => void;
  onClick: (id: number) => void;
}) {
  useEffect(() => {
    let upload = async () => {
      try {
        let data = await getStorageUpload();
        await fetch(data.presignedURL, {
          method: 'PUT',
          body: media.file,
        });
        onUploadSuccess(media.id, data.mediaURL);
      } catch (err) {
        onUploadFiled(media.id);
      }
    };

    media.status === 'uploading' && upload();
  }, []);
  return (
    <div
      className="group rounded overflow-hidden relative  cursor-pointer"
      onClick={() => onClick(media.id)}
    >
      {onRemove ? (
        <Cross1Icon
          onClick={(e) => {
            e.stopPropagation();
            onRemove(media.id);
          }}
          className="group-hover:block hidden cursor-pointer text-white absolute top-[4px] right-[4px]"
          height={16}
          width={16}
        />
      ) : null}
      {media.status === 'uploading' ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2">
          <Loading cover={false} />
        </div>
      ) : null}
      <Image
        src={
          media.status === 'existing'
            ? media.url!
            : URL.createObjectURL(media.file!)
        }
        className="object-cover block w-45 h-32"
        alt="project"
        width={192}
        height={128}
      />
    </div>
  );
}
