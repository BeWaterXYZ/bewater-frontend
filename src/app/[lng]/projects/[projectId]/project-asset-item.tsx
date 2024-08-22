"use client";
import { useAlert } from "@/components/alert/store";
import { useLoadingStoreAction } from "@/components/loading/store";
import { useNavigator } from "@/hooks/useNavigator";
import { updateProject } from "@/services/project";
import { useMutationUpdateProject } from "@/services/project.query";
import { Project } from "@/services/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { data } from "./project-assets";

export function AssetItem({
  value,
  icon,
  label,
  readonly,
  field,
  project,
}: {
  value?: string;
  icon: string;
  label: string;
  readonly: boolean;
  field: (typeof data)[number]["key"];
  project: Project;
}) {
  const mutation = useMutationUpdateProject();
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const [editing, editingSet] = useState(false);
  const [newValue, newValueSet] = useState(value);
  const { confirm } = useAlert();

  const save = async () => {
    showLoading();
    try {
      await mutation.mutateAsync({
        id: project.id,
        teamId: project.teamId,
        [field]: newValue,
      });
    } finally {
      editingSet(false);
      dismissLoading();
    }
  };
  const disconnectGithub = async () => {
    let confirmed = await confirm({
      title: "Are you sure?",
      description: "You are going to disconnect github",
      okCopy: "Confirm",
      cancelCopy: "Cancel",
    });
    if (!confirmed) return;

    showLoading();
    try {
      await mutation.mutateAsync({
        id: project.id,
        teamId: project.teamId,
        [field]: null,
      });
    } finally {
      dismissLoading();
    }
  };

  const completeUrl = (val: string) => {
    if (val) {
      if (!val.includes("//")) {
        return `http://${val}`;
      }
    }
    return val;
  };

  return (
    <div className="rounded p-3 border border-midnight bg-latenight flex gap-2 justify-between ">
      <div className="flex  p-2">
        <Image src={`/icons/${icon}.svg`} width={24} height={24} alt={label} />
      </div>
      {editing ? (
        <>
          <input
            value={newValue}
            onChange={(e) => newValueSet(e.target.value)}
            className="px-3 body-4 bg-night border border-grey-800 w-full "
            type="url"
          />
          <button className="btn btn-primary" onClick={() => save()}>
            Save
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-around flex-1 overflow-hidden">
            {value ? (
              <>
                <p className="body-4 text-gray-500 font-bold capitalize">
                  {label}
                </p>
                <Link
                  target={"_blank"}
                  href={completeUrl(value)}
                  className="body-4 text-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis "
                >
                  {field === "githubURI"
                    ? value.replace("https://github.com/", "")
                    : value}
                </Link>
              </>
            ) : (
              <p className="body-4 text-grey-500">
                Link to your <span className="capitalize">{label}</span>
              </p>
            )}
          </div>
          {!readonly ? (
            <div>
              {field === "githubURI" ? (
                <button
                  className="btn btn-secondary-invert"
                  onClick={disconnectGithub}
                >
                  Disconnect
                </button>
              ) : (
                <button
                  className="btn btn-secondary-invert"
                  onClick={() => editingSet(true)}
                >
                  Edit
                </button>
              )}
            </div>
          ) : (
            <Link
              className="btn btn-secondary"
              href={completeUrl(value!)}
              target={"_blank"}
            >
              Visit
            </Link>
          )}
        </>
      )}
    </div>
  );
}
