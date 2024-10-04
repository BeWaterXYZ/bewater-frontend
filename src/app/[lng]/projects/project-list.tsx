"use client";
import { segmentSchema } from "./param-schema";
import { querySchema } from "@/components/filter/search-param-schema";
import { ProjectItem } from "./project-item";
import { useFetchChallengeById } from "@/services/challenge.query";
import {
  useFetchChallengeProjects,
  useFetchProjects,
  useFetchProjectFilterOptions,
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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function ProjectList({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, "translation");
  const sp = useSearchParams();
  const { tag, challengeTitle, githubTag } = querySchema.parse(
    Object.fromEntries(sp!)
  );
  const showDialog = useDialogStore((s) => s.open);
  const [search, searchSet] = useState("");
  const [cursorId, setCursorId] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[] | undefined>(
    undefined
  );
  const [selectedGithubTags, setSelectedGithubTags] = useState<
    string[] | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadedProjectFirstPage, setLoadedProjectFirstPage] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedChallengeTitle, setSelectedChallengeTitle] = useState<
    string[] | undefined
  >(undefined);
  const {
    data: projectsFetched,
    isLoading: isLoadingProject,
    isFetching: isFetchongProject,
    isSuccess: projectsFetchedSuccess,
  } = useFetchProjects(
    20,
    {
      challengeTitle: selectedChallengeTitle,
      tags: selectedTags,
      githubTags: selectedGithubTags,
      searchQuery: searchQuery,
    },
    cursorId
  );
  const {
    data: filterOptions = { titles: [], tags: [], githubTags: []},
    isLoading: isLoadingfilterOptions,
  } = useFetchProjectFilterOptions();
  const loadMore = () => {
    setCursorId(projects[projects.length - 1].externalId);
  };
  useEffect(() => {
    let selectedTags = undefined;
    let selectedChallengeTitle = undefined;
    let selectedGithubTags = undefined;
    if (tag) {
      const tagsArray = tag.split(",");
      if (tagsArray[0] == "") {
        tagsArray.shift();
      }
      selectedTags = tagsArray;
    }
    if (challengeTitle) {
      const challengeTitleArray = challengeTitle.split(",");
      if (challengeTitleArray[0] == "") {
        challengeTitleArray.shift();
      }
      selectedChallengeTitle = challengeTitleArray;
    }
    if (githubTag) {
      const githubTagArray = githubTag.split(",");
      if (githubTagArray[0] == "") {
        githubTagArray.shift();
      }
      selectedGithubTags = githubTagArray;
    }
    setCursorId(undefined);
    setLoadedProjectFirstPage(false);
    setHasMore(true);
    setSelectedTags(selectedTags);
    setSelectedGithubTags(selectedGithubTags);
    setSelectedChallengeTitle(selectedChallengeTitle);
  }, [tag, challengeTitle, githubTag]);

  useEffect(() => {
    if (!projectsFetchedSuccess) {
      return;
    }
    if (isLoadingProject) {
      return;
    }
    if (isFetchongProject) {
      return;
    }
    if (projectsFetched && projectsFetched.projects.length > 0) {
      if (cursorId) {
        setProjects((prev) => [...prev, ...projectsFetched.projects]);
      } else {
        setProjects([...projectsFetched.projects]);
        setLoadedProjectFirstPage(true);
      }
    } else {
      if (cursorId === undefined) {
        setProjects([]);
      } else {
        setHasMore(false);
      }
    }
  }, [projectsFetched]);

  // if (isLoadingProject && projects.length <= 0) return <Loading />;
  // if (!(projects && projects.length > 0)) return null;

  const showFilter = () => {
    showDialog("project_page_filter", filterOptions);
  };

  if (projects.length === 0) {
    return (
      <div className="container flex flex-wrap gap-10 pt-10">
        <div className="w-full lg:w-[200px] hidden lg:block">
          <ProjectFilter filterOptions={filterOptions} />
        </div>
        <div className="w-full min-h-96 lg:w-auto flex-1 mb-30 flex flex-col items-center justify-center gap-4 my-20">
          {isLoadingProject ? (
            <Loading cover={false} icon={true} />
          ) : (
            <>
              <Image
                src="/icons/no-project.svg"
                height={180}
                width={270}
                alt="no teams"
              />
              <p className="body-1 text-[20px] text-center">
                No Projects Here yet
              </p>
              <p className="body-2 text-grey-500 text-center">
                Create yours and be the first challenger!
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-wrap gap-10 pt-10">
      <div className="w-full lg:w-[200px] hidden lg:block">
        <ProjectFilter filterOptions={filterOptions} />
      </div>
      <div className="w-full lg:w-auto flex-1 mb-30">
        {/* search and filter bar  */}
        <div className="flex justify-end py-4">
          {/* <div className="hidden lg:block invisible">
            <button className="body-3 flex gap-1">
              <Image
                src="/icons/sort.svg"
                height={16}
                width={16}
                alt="filter"
              />
              Sort
            </button>
          </div> */}
          <div className="w-full lg:w-auto flex flex-col gap-4">
            <div className="lg:min-w-[300px] flex items-center">
              <div className="flex-1">
                <SearchInput
                  placeholder="Search for project name or description"
                  value={search}
                  onChange={(e) => searchSet(e.target.value)}
                />
              </div>
              <button
                className="btn btn-secondary flex items-center gap-2 ml-2"
                onClick={() => {
                  // Implement search functionality here
                  console.log("Search clicked with query:", search);
                  setSearchQuery(search);
                }}
              >
                Search
              </button>
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
        </div>
        <div className="grid gap-4 grid-cols-300">
          {projects.map((project) => {
            return <ProjectItem key={project.id} project={project} lng={lng} />;
          })}
        </div>
        <button
          disabled={!hasMore}
          className="w-full bg-white/5 rounded border border-[#24254E] text-white h-12 mt-2"
          onClick={loadMore}
        >
          {hasMore
            ? isFetchongProject
              ? t("common.loading")
              : t("common.load_more")
            : t("common.no_more")}
        </button>
      </div>
    </div>
  );
}
