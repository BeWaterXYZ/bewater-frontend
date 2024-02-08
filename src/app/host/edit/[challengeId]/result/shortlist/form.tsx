"use client";
import { Challenge, Project, Shortlist } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { SearchInput } from "@/components/molecules/search-input";
import { useMutationUpdateShortlist } from "@/services/challenge.query";
import { Switch, SwitchRaw } from "@/components/form/switch";
import { Input } from "@/components/form/control";
import { CheckIcon } from "@radix-ui/react-icons";
import { useToastStore } from "@/components/toast/store";
import DotIcon from "../dot-icon";
import { ReactSortable } from "react-sortablejs";
import Announcement from "../announcement";
import clsx from "clsx";

const schema = z.object({
  announceShortlist: z.string().optional(),
  shortlist: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      projectIdArr: z.array(z.object({ projectId: z.string() })),
      display: z.boolean(),
    })
  ),
});

type Inputs = z.infer<typeof schema>;

export function Shortlist({
  challenge,
  projects,
  shortlist,
}: {
  challenge: Challenge;
  projects: Project[];
  shortlist: Shortlist[];
}) {
  const addToast = useToastStore((s) => s.add);
  const [classify, setClassify] = useState(
    shortlist.length !== 1 && shortlist[0]?.name !== ""
  );
  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      announceShortlist: challenge.future.announceShortlist,
      shortlist:
        shortlist.length > 0
          ? shortlist.map((sl) => ({
              ...sl,
              projectIdArr: sl.projectIdArr.map((pid) => ({ projectId: pid })),
            }))
          : (challenge.track ?? []).map((t) => ({
              name: t,
              projects: [],
              display: true,
            })),
    },
  });
  let mutation = useMutationUpdateShortlist(challenge.id);
  let [announceNow, announceNowSet] = useState(
    !challenge.future.announceShortlist
  );
  useEffect(() => {
    const addTrack = (name: string) => {
      append({
        name,
        projectIdArr: [],
        display: true,
      });
    };
    if (classify) {
      const trackNames = challenge.track ?? [];
      setValue(
        "shortlist",
        getValues().shortlist.filter((sl) => trackNames.includes(sl.name))
      );
      const shortlistNames = shortlist.map((sl) => sl.name);
      challenge.track
        ?.filter((t) => shortlistNames.includes(t))
        .forEach((t) => addTrack(t));
    } else {
      setValue("shortlist", []);
      addTrack("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classify]);
  console.log(getValues());
  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        // announceShortlist: announceNow
        //   ? null
        //   : formData.announceShortlist ?? null,
        shortlist: formData.shortlist.map((sl) => ({
          ...sl,
          projectIdArr: sl.projectIdArr.map((p) => p.projectId),
        })),
      });
      addToast({ title: "Updated", type: "success" });
    } catch (err) {
      addToast({ title: `${err}` });
    }
  };
  const { fields, move, append } = useFieldArray({
    control,
    name: "shortlist",
  });

  return (
    <div>
      <div className="my-8 font-secondary">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <p className="body-2 mb-6">Shortlisted projects</p>
          <div className="text-sm text-[#CBD5E1] leading-5 mb-6">
            <SwitchRaw
              label="Classify Shortlist by Track"
              onCheckedChange={(v) => setClassify(v)}
              checked={classify}
            />
          </div>
          <ReactSortable
            list={fields}
            setList={() => {}}
            animation={150}
            disabled={!classify}
            onEnd={(e) => move(e.oldDraggableIndex!, e.newDraggableIndex!)}
          >
            {fields.map((f, index) => {
              return (
                <div
                  key={f.id}
                  className="bg-[#0B0C24] border border-[#323232] p-4 pl-2 mb-4"
                >
                  <div
                    className={clsx("absolute dot-icon", {
                      invisible: !classify,
                    })}
                  >
                    <DotIcon />
                  </div>
                  <div className="pl-[36px] pt-[4px]">
                    <div className="flex justify-between mb-2">
                      <p className="body-3">
                        Track -{" "}
                        {watch(`shortlist.${index}.name`) || "Shortlist"}
                      </p>
                      <div className={clsx("flex", { invisible: !classify })}>
                        <div className="flex items-center">
                          <p className="text-xs leading-4 text-[#64748B] font-secondary mr-2">
                            Enable
                          </p>
                          <Switch
                            control={control}
                            name={`shortlist.${index}.display`}
                            label={""}
                            onValueChange={(v) => {
                              setValue(`shortlist.${index}.display`, v);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={clsx({ hidden: !classify })}>
                      <Input
                        label="Display Name"
                        {...register(`shortlist.${index}.name`)}
                        onChange={(e) => {
                          setValue(`shortlist.${index}.name`, e.target.value);
                        }}
                        error={errors?.["shortlist"]?.[index]?.["name"]}
                      />
                    </div>

                    <Projects
                      index={index}
                      control={control}
                      register={register}
                      errors={errors}
                      projects={projects}
                    />
                  </div>
                </div>
              );
            })}
          </ReactSortable>
          {/* <button
            className="btn btn-secondary mr-4"
            aria-label="Customise options"
            type="button"
            onClick={onAddTrack}
          >
            + Add track
          </button> */}
          <button className="btn btn-primary my-8">Save</button>
        </form>
        <Announcement
          date={challenge.future.announceShortlist}
          milestone={[...challenge.milestones].pop()?.dueDate}
          onDateChange={async (date: string | null) => {
            try {
              await mutation.mutateAsync({
                announceShortlist: date,
              });
              addToast({ title: "Updated", type: "success" });
            } catch (err) {
              addToast({ title: `${err}` });
            }
          }}
        />
      </div>
    </div>
  );
}

function Projects({
  index,
  control,
  register,
  errors,
  projects,
}: {
  index: number;
  control: Control<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  projects: Project[];
}) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `shortlist.${index}.projectIdArr`,
    }
  );
  let [search, setSearch] = useState("");
  let projects_ = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  let addProject = (projectId: string) => () => {
    append({
      projectId: projectId,
    });
  };
  let removeProject = (projectIndex: number) => () => {
    remove(projectIndex);
  };
  return (
    <div>
      <p className="body-4  py-1 text-grey-500 font-bold">Projects</p>
      {fields.length > 0 ? (
        fields.map((field, i) => {
          let project = projects.find((p) => p.id === field.projectId);
          return (
            <div
              className=" body-3 bg-[#04051B] border border-[#1E293B] p-4 mb-4 flex justify-between items-center"
              key={field.id}
            >
              <div className="flex-1">{project?.name}</div>
              <div className="flex-1">{project?.team.name}</div>
              <div className="">
                <button className="text-grey-300" onClick={removeProject(i)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="border border-grey-800 p-4 body-4 mb-4 text-grey-300">
          Please add a project for this track or if you don’t want to show this
          track you can hidden it.
        </div>
      )}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="btn btn-secondary"
            aria-label="Customise options"
            type="button"
          >
            + Add projects
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-[#0F1021] border border-[#1E293B] p-4 my-4"
            sideOffset={5}
          >
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search project name"
            />
            <div className="max-h-[400px] overflow-y-scroll mt-2">
              {projects_.map((proj) => {
                let selected = fields.some((f) => f.projectId === proj.id);
                return (
                  <div
                    key={proj.id}
                    className="body-3 p-2 flex justify-between items-center hover:bg-[#FFF1] rounded select-none cursor-pointer"
                    onClick={!selected ? addProject(proj.id) : () => {}}
                  >
                    <div className="max-w-[320px]">{proj.name} </div>
                    <div>{selected && <CheckIcon />}</div>
                  </div>
                );
              })}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
