"use client";
import { useMutationUpdateProject } from "@/services/project.query";
import { Challenge, Project } from "@/services/types";
import { useClerk } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ImageContainer, Media } from "./image-container";
import { ImageGallery } from "./image-gallery";

let counter = 0;

interface ProjectMediaProps {
  project: Project;
  challenge: Challenge;
}
export default function ProjectMedia({
  project,
  challenge,
}: ProjectMediaProps) {
  const user = useClerk().user;
  const mutation = useMutationUpdateProject();
  const [viewImage, viewImageSet] = useState<undefined | number>(undefined);
  // todo use isTeamMember instead
  const isLeader = project.team.teamMembers
    // .filter((m) => m.isLeader)
    .some((m) => m.userProfile.clerkId === user?.id);

  const [medias, mediaSet] = useState<Media[]>(() =>
    project.mediaURLs.map((img) => ({
      url: img,
      id: counter++,
      status: "existing",
    }))
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
        status: "uploading",
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
        media.id === id ? { ...media, status: "uploaded", url } : media
      )
    );
    changedSet(true);
  };
  const onUploadFailed = (id: number) => {
    mediaSet((medias) =>
      medias.map((media) =>
        media.id === id ? { ...media, status: "failed" } : media
      )
    );
    changedSet(true);
  };

  useEffect(() => {
    const checkThenUpdateProfile = async () => {
      if (!changed) return;
      if (medias.some((media) => media.status === "uploading")) return null;

      await mutation.mutateAsync({
        id: project.id,
        teamId: project.teamId,
        mediaURLs: medias
          .filter((media) => media.status !== "failed")
          .map((media) => media.url!),
      });
    };

    checkThenUpdateProfile();
  }, [medias, changed, mutation, project.id, project.teamId]);

  const onImageClick = (id: number) => {
    viewImageSet(id);
  };
  return (
    <div className="pt-5 pb-10">
      {(!isLeader || medias.length === 0) &&
        !canUpload &&
        medias.length === 0 && (
          <div className="rounded border border-[#24254E] bg-latenight p-4 body-2 text-grey-600">
            Not uploaded images yet.
          </div>
        )}
      {isLeader || !(challenge.yotadata?.hideTeamProfile ?? true) ? (
        <div className="flex gap-3 flex-wrap">
          {medias.map((media) => (
            <ImageContainer
              key={media.id}
              onClick={onImageClick}
              media={media}
              onRemove={isLeader ? onRemove : undefined}
              onUploadFailed={onUploadFailed}
              onUploadSuccess={onUploadSuccess}
            />
          ))}

          <ImageGallery
            sources={project.mediaURLs}
            show={viewImage !== undefined}
            onClose={() => viewImageSet(undefined)}
            firstToShow={medias.findIndex((m) => m.id === viewImage)}
          />

          {canUpload ? (
            <label
              htmlFor="upload"
              className="w-48 h-32 cursor-pointer rounded border border-dashed border-[#475569] flex flex-col justify-center items-center"
            >
              <PlusIcon className="text-white" height={32} width={32} />
              <span className="body-4  text-grey-300 my-1" aria-hidden="true">
                Up to 4 images
              </span>
              <span className="body-5 text-grey-500" aria-hidden="true">
                PNG or JPG
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
      ) : (
        <div className="rounded border border-[#24254E] bg-latenight p-4 body-2 text-grey-600">
          This section is hidden.
        </div>
      )}
    </div>
  );
}
