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
  onUploadFailed,
}: {
  media: Media;
  onRemove?: (id: number) => void;
  onUploadSuccess: (id: number, url: string) => void;
  onUploadFailed: (id: number) => void;
  onClick: (id: number) => void;
}) {
  useEffect(() => {
    let upload = async () => {
      try {
        let data = await getStorageUpload();
        let res = await fetch(data.presignedURL, {
          method: 'PUT',
          body: media.file,
        });
        if (res.status !== 200) {
          throw new Error('upload file not OK 200');
        }
        onUploadSuccess(media.id, data.mediaURL);
      } catch (err) {
        onUploadFailed(media.id);
      }
    };

    media.status === 'uploading' && upload();
  }, []);
  return (
    <div
      className="group rounded overflow-hidden relative  cursor-pointer "
      onClick={() => onClick(media.id)}
    >
      <div className="absolute top-0 bottom-0 right-0 left-0 group-hover:bg-[rgba(4,_5,_27,_0.7)] group-hover:backdrop-blur-[2px]"></div>
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
        className="object-cover block w-48 h-32"
        alt="project"
        width={192}
        height={128}
      />
    </div>
  );
}
