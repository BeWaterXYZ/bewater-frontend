'use client';
import { useNavigator } from '@/hooks/useNavigator';
import { updateProject } from '@/services/project';
import { useMutationUpdateProject } from '@/services/project.query';
import { Project } from '@/services/types';
import { useAuthStore } from '@/stores/auth';
import { PlusIcon } from '@radix-ui/react-icons';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { ImageContainer, Media } from './image-container';

let counter = 0;

interface ProjectMediaProps {
  project: Project;
}
export default function ProjectMedia({ project }: ProjectMediaProps) {
  const user = useAuthStore((s) => s.user);
  const mutation = useMutationUpdateProject();

  const router = useNavigator();
  const isLeader = project.team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.userId === user?.userId);

  const [medias, mediaSet] = useState<Media[]>(() =>
    project.mediaURLs.map((img) => ({
      url: img,
      id: counter++,
      status: 'existing',
    })),
  );
  const [changed, changedSet] = useState(false);

  const canUpload = isLeader && medias.length < 4;

  const onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    let file = e.target.files?.[0];
    if (!file) return;
    mediaSet((medias) => [
      ...medias,
      {
        file: file!,
        status: 'uploading',
        id: counter++,
      },
    ]);
  };
  const onRemove = (id: number) => {
    mediaSet((medias) => medias.filter((media) => media.id !== id));
    changedSet(true);
  };
  const onUploadSuccess = (id: number, url: string) => {
    mediaSet((medias) =>
      medias.map((media) =>
        media.id === id ? { ...media, status: 'uploaded', url } : media,
      ),
    );
    changedSet(true);
  };
  const onUploadFiled = (id: number) => {
    mediaSet((medias) =>
      medias.map((media) =>
        media.id === id ? { ...media, status: 'failed' } : media,
      ),
    );
    changedSet(true);
  };

  useEffect(() => {
    const checkThenUpdateProfile = async () => {
      if (!changed) return;
      if (medias.some((media) => media.status === 'uploading')) return null;

      await mutation.mutateAsync({
        id: project.id,
        teamId: project.teamId,
        mediaURLs: medias
          .filter((media) => media.status !== 'failed')
          .map((media) => media.url!),
      });
    };

    checkThenUpdateProfile();
  }, [medias, changed]);

  return (
    <div className="py-4">
      <div className="flex gap-3 flex-wrap">
        {medias.map((media) => (
          <ImageContainer
            key={media.id}
            media={media}
            onRemove={isLeader ? onRemove : undefined}
            onUploadFiled={onUploadFiled}
            onUploadSuccess={onUploadSuccess}
          />
        ))}

        {canUpload ? (
          <label
            htmlFor="upload"
            className="w-48 h-32 cursor-pointer rounded border border-dashed border-[#475569] flex flex-col justify-center items-center"
          >
            <PlusIcon className="text-white" height={32} width={32} />
            <span className="body-4  text-grey-300" aria-hidden="true">
              Up to 4 images
            </span>
            <span className="body-5 text-grey-500" aria-hidden="true">
              PNG or JGP
            </span>
            <input
              type="file"
              id="upload"
              name="avatar"
              className="hidden"
              accept="image/*"
              onChange={onFileSelect}
            />
          </label>
        ) : null}
      </div>
    </div>
  );
}
