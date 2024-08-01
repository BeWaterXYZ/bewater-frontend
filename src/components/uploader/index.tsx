"use client";
import { getStorageUpload } from "@/services/storage";
import {
  ArrowBottomRightIcon,
  ArrowTopLeftIcon,
  Cross1Icon,
  PlusIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { ChangeEventHandler, useId, useRef, useState } from "react";
import { Loading } from "../loading/loading";

async function upload(file: File) {
  let data = await getStorageUpload();
  let res = await fetch(data.presignedURL, {
    method: "PUT",
    body: file,
  });
  if (res.status !== 200) {
    throw new Error("upload file not OK 200");
  }
  return data.mediaURL;
}
export interface UploaderProps {
  max: number;
  urls: string[];
  title: string;
  subTitlte: string;
  height: number;
  width: number;
  onChange: (urls: string[]) => void;
}
export function Uploader({
  max,
  onChange,
  urls,
  title,
  subTitlte,
  height,
  width,
}: UploaderProps) {
  let id = useId();
  let [uploadingList, uploadingListSet] = useState<File[]>([]);
  let canUploadMore = max > urls.length + uploadingList.length;
  // prevent closure reading staled `urls`
  let onChangeRef = useRef<((url: string, old?: string) => void) | undefined>(
    undefined
  );
  onChangeRef.current = (url: string, old?: string) => {
    if (old) {
      let index = urls.findIndex((v) => v === old);
      let urls_ = [...urls];
      urls_.splice(index, 1, url);
      onChange(urls_);
    } else {
      onChange([...urls, url]);
    }
  };

  let onFileSelect: ChangeEventHandler<HTMLInputElement> = async (e) => {
    let fileSize = 0;
    let filesPicked = Array.from(e.target.files ?? []);
    if (filesPicked.length === 1) {
      fileSize = filesPicked[0].size;
    }

    if (fileSize > 3 * 1024 * 1024) {
      window.alert("Image size should be less than 3MB");
      e.target.value = "";
      return;
    }

    uploadingListSet((list) => list.concat(filesPicked));
    filesPicked.forEach(async (file) => {
      try {
        let url = await upload(file);
        onChangeRef.current?.(url);
      } catch (err) {
        console.error("uploading error", err);
      } finally {
        uploadingListSet((uploading) =>
          uploading.filter((f) => f.name !== file.name)
        );
      }
    });
  };

  let onFileReplace: (old: string) => ChangeEventHandler<HTMLInputElement> =
    (old: string) => async (e) => {
      let fileSize = 0;
      let filesPicked = Array.from(e.target.files ?? []);
      if (filesPicked.length === 1) {
        fileSize = filesPicked[0].size;
      }

      if (fileSize > 3 * 1024 * 1024) {
        window.alert("Image size should be less than 3MB");
        e.target.value = "";
        return;
      }

      uploadingListSet((list) => list.concat(filesPicked));
      filesPicked.forEach(async (file) => {
        try {
          let url = await upload(file);
          onChangeRef.current?.(url, old);
        } catch (err) {
          console.error("uploading error", err);
        } finally {
          uploadingListSet((uploading) =>
            uploading.filter((f) => f.name !== file.name)
          );
        }
      });
    };

  let onRemove = (url: string) => {
    onChange(urls.filter((u) => u !== url));
  };
  let onRemoveUp = (url: string) => {
    let index = urls.indexOf(url);
    if (index > 0) {
      let clone = [...urls];
      [clone[index - 1], clone[index]] = [clone[index], clone[index - 1]];
      onChange(clone);
    }
  };
  let onRemoveDown = (url: string) => {
    let index = urls.indexOf(url);
    if (index < urls.length - 1) {
      let clone = [...urls];
      [clone[index + 1], clone[index]] = [clone[index], clone[index + 1]];
      onChange(clone);
    }
  };
  return (
    <div className="  flex flex-wrap gap-3" style={{}}>
      {/* existing */}
      {urls.map((url, index) => {
        return (
          <div
            key={url}
            className="bg-night relative group/image "
            style={{ height, width }}
          >
            <Image
              src={url}
              fill
              alt="img"
              className="object-contain h-[100%]"
            ></Image>

            <div className="absolute top-0 right-0 gap-2 hidden group-hover/image:flex bg-black/30 p-2">
              <label>
                <input
                  type="file"
                  id={`upload-input-${index}-${id}`}
                  name="avatar"
                  className="hidden"
                  accept="image/*"
                  multiple={max !== 1}
                  onChange={onFileReplace(url)}
                />
                <UpdateIcon
                  className="cursor-pointer text-white"
                  height={16}
                  width={16}
                />
              </label>

              <ArrowTopLeftIcon
                className="cursor-pointer text-white"
                height={16}
                width={16}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveUp(url);
                }}
              />
              <ArrowBottomRightIcon
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveDown(url);
                }}
                height={16}
                width={16}
              />

              <Cross1Icon
                className="cursor-pointer text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(url);
                }}
                height={16}
                width={16}
              />
            </div>
          </div>
        );
      })}
      {/* uploading */}
      {uploadingList.map((file) => {
        return (
          <div key={file.name} className="relative " style={{ height, width }}>
            <Image src={URL.createObjectURL(file)} fill alt="img"></Image>
            <Loading cover={false} />
          </div>
        );
      })}
      {/* file picker  */}
      {canUploadMore ? (
        <label
          style={{ height, width }}
          htmlFor={`upload-input-${id}`}
          className=" bg-night h-full w-full cursor-pointer rounded    flex flex-col justify-center items-center"
        >
          <PlusIcon className="text-white" height={32} width={32} />
          <span
            className="text-[16px] text-grey-300 my-1 text-center"
            aria-hidden="true"
          >
            {title}
          </span>
          <span
            className="text-[14px] text-grey-500 text-center"
            aria-hidden="true"
          >
            {subTitlte}
          </span>
          <input
            type="file"
            id={`upload-input-${id}`}
            name="avatar"
            className="hidden"
            accept="image/*"
            multiple={max !== 1}
            onChange={onFileSelect}
          />
        </label>
      ) : null}
    </div>
  );
}
