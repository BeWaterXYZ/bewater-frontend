"use client";
import { DatePicker } from "@/components/form/datepicker";
import { validationSchema } from "@/schema";
import { Challenge, Project, Shortlist } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroup from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { useState } from "react";
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
import { Switch } from "@/components/form/switch";
import { Input } from "@/components/form/control";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@radix-ui/react-icons";
import { useToastStore } from "@/components/toast/store";
import DotIcon from "../dot-icon";
import { ReactSortable } from "react-sortablejs";

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

  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        announceShortlist: announceNow
          ? null
          : formData.announceShortlist ?? null,
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

  const onAddTrack = () => {
    append({
      name: "",
      projectIdArr: [],
      display: true,
    });
  };
  return (
    <div>
      <div className="my-8 font-secondary">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <p className="body-2">Shortlisted projects</p>
          <ReactSortable
            list={fields}
            setList={() => {}}
            animation={150}
            onEnd={(e) => move(e.oldDraggableIndex!, e.newDraggableIndex!)}
          >
            {fields.map((f, index) => {
              return (
                <div
                  key={f.id}
                  className="bg-[#0B0C24] border border-[#323232] p-4 pl-2 my-4"
                >
                  <div className="absolute dot-icon">
                    <DotIcon />
                  </div>
                  <div className="pl-[36px] pt-[4px]">
                    <div className="flex justify-between">
                      <p className="body-3">Track - {f.name}</p>
                      <div className="flex">
                        {/* <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        move(index, Math.max(index - 1, 0));
                      }}
                    >
                      <ArrowUpIcon className="mr-1 text-grey-500" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        move(index, Math.min(index + 1, fields.length - 1));
                      }}
                    >
                      <ArrowDownIcon className="mr-1 text-grey-500" />
                    </button> */}
                        <div className="flex items-center">
                          <p
                            className="text-xs leading-4 text-[#64748B]"
                            style={{
                              fontFamily: "var(--font-secondary)",
                            }}
                          >
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
                    <Input
                      label="Display Name"
                      {...register(`shortlist.${index}.name`)}
                      error={errors?.["shortlist"]?.[index]?.["name"]}
                    />

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

          <button
            className="btn btn-secondary"
            aria-label="Customise options"
            type="button"
            onClick={onAddTrack}
          >
            + Add track
          </button>

          <p className="body-2 mt-8">Announcement</p>
          <p className="body-3 text-grey-600 mb-4">
            The results will be publicly displayed at the campaign page, and a
            notification email will be posted to the team members in the
            results.{" "}
          </p>

          <RadioGroup.Root
            className="flex flex-col gap-2"
            defaultValue={announceNow ? "0" : "1"}
            value={announceNow ? "0" : "1"}
            onValueChange={(v) => {
              announceNowSet(v === "0");
            }}
          >
            <div
              className={clsx(
                "flex-1 flex gap-3 items-center rounded-sm  p-2 text-grey-300"
              )}
            >
              <RadioGroup.Item
                className="bg-white h-5 min-w-[20px] w-5 rounded-full "
                value={"0"}
                id={"ann-item-0"}
              >
                <RadioGroup.Indicator className=" flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-full after:bg-white" />
              </RadioGroup.Item>
              <label className="text-[14px]" htmlFor={"ann-item-0"}>
                Announce immediately
              </label>
            </div>

            <div
              className={clsx(
                "flex-1 flex gap-3 items-center rounded-sm  p-2 text-grey-300"
              )}
            >
              <RadioGroup.Item
                className="bg-white h-5 min-w-[20px] w-5 rounded-full"
                value={"1"}
                id={"ann-item-1"}
              >
                <RadioGroup.Indicator className=" flex items-center justify-center relative w-full h-full rounded-full bg-day after:content-[''] after:block after:w-[8px] after:h-[8px] after:rounded-full after:bg-white" />
              </RadioGroup.Item>
              <label className="text-[14px]" htmlFor={"ann-item-1"}>
                Schedule announcement time
              </label>
            </div>
          </RadioGroup.Root>

          {!announceNow && (
            <DatePicker
              label="Announce Date"
              control={control}
              onValueChange={(v) => setValue("announceShortlist", v)}
              {...register("announceShortlist")}
              error={errors["announceShortlist"]}
            />
          )}

          <button className="btn btn-primary my-8">Save</button>
        </form>
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
            <div className="max-h-[400px] overflow-y-scroll">
              {projects_.map((proj) => {
                let selected = fields.some((f) => f.projectId === proj.id);
                return (
                  <div
                    key={proj.id}
                    className="body-3 py-2 flex justify-between items-center"
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
