"use client";
import { segmentSchema } from "./param-schema";
import { querySchema } from "@/components/filter/search-param-schema";
import { ProjectItem } from "./project-item";
import { useFetchChallengeById } from "@/services/challenge.query";
import {
  useFetchChallengeProjects,
  useFetchProjects,
  useFetchProjectTags,
} from "@/services/project.query";
import Loading from "./loading";
import { ProjectFilter } from "./project-filter";
import {
  Project,
  UserProfile,
  ProjectStatus,
  Challenge,
} from "@/services/types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/molecules/search-input";
import { useDialogStore } from "@/components/dialog/store";
import { useClerk } from "@clerk/nextjs";
import { useFetchUser } from "@/services/user.query";
import { useTranslation } from "@/app/i18n/client";

export default function ProjectList({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "translation");
  const sp = useSearchParams();
  const { tag } = querySchema.parse(Object.fromEntries(sp!));
  const showDialog = useDialogStore((s) => s.open);
  const [search, searchSet] = useState("");
  const [cursorId, setCursorId] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[] | undefined>(
    undefined
  );
  const { data: projectsFetched, isLoading: isLoadingProject,isFetching:isFetchongProject } =
    useFetchProjects(20, selectedTags, cursorId);
  // const { data: tags = [], isLoading: isLoadingTags } = useFetchProjectTags();
  const loadMore = () => {
    setCursorId(projects[projects.length - 1].externalId);
  };
  useEffect(() => {
    setSelectedTags(tag?.split(","));
  }, [tag]);
  useEffect(() => {
    if (projectsFetched && projectsFetched.length > 0) {
      setProjects((prev) => [...prev, ...projectsFetched]);
    }
  }, [projectsFetched]);

  if (isLoadingProject && projects.length <= 0) return <Loading />;
  if (!(projects && projects.length > 0)) return null;

  // const showFilter = () => {
  //   showDialog("project_page_filter", { tags });
  // };

  if (projects.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 my-20">
        <Image
          src="/icons/no-project.svg"
          height={180}
          width={270}
          alt="no teams"
        />
        <p className="body-1 text-[20px] text-center">No Projects Here yet</p>
        <p className="body-2 text-grey-500 text-center">
          Create yours and be the first challenger!
        </p>
      </div>
    );
  }

  return (
    <div className="container flex flex-wrap gap-10 pt-10">
      {/* <div className="w-full lg:w-[200px] hidden lg:block">
        <ProjectFilter tags={tags} />
      </div> */}
      <div className="w-full lg:w-auto flex-1 mb-30">
        {/* search and filter bar  */}
        {/* <div className="flex justify-between py-4">
          <div className="hidden lg:block invisible">
            <button className="body-3 flex gap-1">
              <Image
                src="/icons/sort.svg"
                height={16}
                width={16}
                alt="filter"
              />
              Sort
            </button>
          </div>
          <div className="w-full lg:w-auto flex  flex-col gap-4">
            <div className="lg:min-w-[300px]">
              <SearchInput
                value={search}
                onChange={(e) => searchSet(e.target.value)}
              />
            </div>
            <div className="flex lg:hidden justify-between gap-2">
              <button
                className="btn btn-secondary-invert w-full gap-1"
                onClick={showFilter}
              >
                <Image
                  src="/icons/filter.svg"
                  height={16}
                  width={16}
                  alt="filter"
                />
                Filter
              </button>
            </div>
          </div>
        </div> */}
        <div className="grid gap-4 grid-cols-300">
          {projects.map((project) => {
            return <ProjectItem key={project.id} project={project} lng={lng} />;
          })}
        </div>
        <button
          className="w-full bg-white/5 rounded border border-[#24254E] text-white h-12 mt-2"
          onClick={loadMore}
        >
          {isFetchongProject ? t("common.loading") : t("common.load_more")}
        </button>
      </div>
    </div>
  );
}
