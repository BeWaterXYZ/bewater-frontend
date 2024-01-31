"use client";
import { validationSchema } from "@/schema";
import { Challenge, Project, Shortlist } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  useMutationUpdateChallenge,
  useMutationUpdateShortlist,
} from "@/services/challenge.query";
import { Switch } from "@/components/form/switch";
import { Input } from "@/components/form/control";
import { CheckIcon } from "@radix-ui/react-icons";
import { useToastStore } from "@/components/toast/store";
import DotIcon from "../dot-icon";
import { ReactSortable } from "react-sortablejs";
import Announcement from "../announcement";

const schema = z.object({
  announceResult: z.string().optional(),
  result: z.array(
    z.object({
      track: z.string(),
      awards: z.array(
        z.object({
          awardName: validationSchema.text,
          prize: z.number().optional(),
          amount: validationSchema.nonNegative,
          count: validationSchema.positive,
          teamIds: z.array(z.object({ teamId: z.string() })),
        })
      ),
    })
  ),
});

type Inputs = z.infer<typeof schema>;

export function FinalResult({
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
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      announceResult: challenge.future.announceResult,
      result: challenge.result
        ? challenge.result.map((r) => {
            return {
              track: r.track,
              awards: r.awards.reduce((prev, cur) => {
                let award = prev.find(
                  (a) => a.prize === cur.prize || a.awardName === cur.awardName
                );
                if (award) {
                  award.teamIds.push({ teamId: cur.teamId.toString() });
                  award.count = (+award.count + 1).toString();
                } else {
                  prev.push({
                    awardName: cur.awardName ?? "",
                    amount: cur.award?.toString() ?? "",
                    count: "1",
                    teamIds: [{ teamId: cur.teamId.toString() }],
                    prize: cur.prize,
                  });
                }

                return prev;
              }, [] as Inputs["result"][number]["awards"]),
            };
          })
        : (
            challenge.track ??
            challenge.awardAssorts?.map((aa) => aa.name) ??
            []
          ).map((t) => ({
            track: t,
            awards: [
              {
                awardName: "Winner",
                amount: "10000",
                count: "1",
                teamIds: [],
                prize: 1,
              },
              {
                awardName: "2nd place",
                amount: "5000",
                count: "2",

                teamIds: [],
                prize: 2,
              },
              {
                awardName: "3rd place",
                amount: "3000",
                count: "3",

                teamIds: [],
                prize: 3,
              },
            ],
          })),
    },
  });
  let mutation = useMutationUpdateChallenge(challenge.id);
  let mutation2 = useMutationUpdateShortlist(challenge.id);

  let [announceNow, announceNowSet] = useState(
    !challenge.future.announceShortlist
  );
  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation2.mutateAsync({
        shortlist: shortlist,
        announceResult: formData.announceResult,
      });
      await mutation.mutateAsync({
        id: challenge.id,

        result: formData.result.map((r) => ({
          track: r.track,
          awards: r.awards.flatMap((a) =>
            a.teamIds.map((tm) => ({
              teamId: +tm.teamId,
              prize: a.prize,
              awardName: a.awardName,
              award: +a.amount,
            }))
          ),
        })),
      });
      addToast({ title: "Updated", type: "success" });
    } catch (err) {
      addToast({ title: `${err}` });
    }
  };
  const { fields, move, append } = useFieldArray({
    control,
    name: "result",
  });

  const onAddTrack = () => {
    append({
      track: "New track",
      awards: [
        {
          awardName: "Winner",
          amount: "10000",
          count: "1",
          teamIds: [],
          prize: 1,
        },
        {
          awardName: "2nd place",
          amount: "5000",
          count: "2",

          teamIds: [],
          prize: 2,
        },
        {
          awardName: "3rd place",
          amount: "3000",
          count: "3",

          teamIds: [],
          prize: 3,
        },
      ],
    });
  };
  return (
    <div>
      <div className="my-8 font-secondary">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <p className="body-2">Final result</p>
          <ReactSortable
            list={fields}
            setList={() => {}}
            animation={150}
            className=".dot-icon"
            onEnd={(e) => move(e.oldDraggableIndex!, e.newDraggableIndex!)}
          >
            {fields.map((f, index) => {
              return (
                <div
                  key={f.id}
                  className="bg-[#0B0C24] border border-[#323232] p-4 pl-2 my-4"
                >
                  <div className="absolute">
                    <DotIcon />
                  </div>
                  <div className="pl-[36px] pt-[4px]">
                    <div className="flex justify-between mb-2">
                      <p className="body-3">
                        Track - {watch(`result.${index}.track`)}
                      </p>
                      <div className="flex">
                        <div className="flex items-center">
                          <p className="text-xs leading-4 text-[#64748B] font-secondary mr-2">
                            Enable
                          </p>
                          <Switch
                            control={control}
                            name={`result.${index}.display`}
                            onValueChange={(v) => {
                              // TODO: result 赛道需要 display 字段
                              // setValue(`result.${index}.display`, v);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <Input
                      label="Display Name"
                      {...register(`result.${index}.track`)}
                      error={errors?.["result"]?.[index]?.["track"]}
                    />
                    <Awards
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
            className="btn btn-secondary mr-4"
            aria-label="Customise options"
            type="button"
            onClick={onAddTrack}
          >
            + Add track
          </button>
          <button className="btn btn-primary my-8">Save</button>
        </form>
        <Announcement
          date={challenge.future.announceResult}
          milestone={[...challenge.milestones].pop()?.dueDate}
          onDateChange={async (date: string | null) => {
            try {
              await mutation2.mutateAsync({
                announceResult: date,
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

function Awards({
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
      name: `result.${index}.awards`,
    }
  );

  let addAward = () => {
    append({
      awardName: "award name",
      amount: "1000",
      count: "5",
      teamIds: [],
    });
  };
  let removeAward = (index: number) => () => {
    remove(index);
  };
  return (
    <div>
      <p className="body-4  py-1 text-grey-500 font-bold">Awards</p>

      {fields.map((field, i) => {
        return (
          <div
            key={field.id}
            className=" body-3 bg-[#04051B] border border-[#1E293B] p-4 mb-4"
          >
            <div className=" flex justify-between items-center gap-4">
              <div className="flex-1">
                <Input
                  readOnly={i < 3}
                  label="Prize name"
                  {...register(`result.${index}.awards.${i}.awardName`)}
                  error={
                    errors?.["result"]?.[index]?.["awards"]?.[i]?.["awardName"]
                  }
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Quantity"
                  {...register(`result.${index}.awards.${i}.count`)}
                  error={
                    errors?.["result"]?.[index]?.["awards"]?.[i]?.["count"]
                  }
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Prize"
                  {...register(`result.${index}.awards.${i}.amount`)}
                  error={
                    errors?.["result"]?.[index]?.["awards"]?.[i]?.["amount"]
                  }
                />
              </div>
              <div className="">
                <button className="text-grey-300 pr-4" onClick={removeAward(i)}>
                  Remove
                </button>
              </div>
            </div>
            <Projects
              index={index}
              awardsIndex={i}
              control={control}
              register={register}
              errors={errors}
              projects={projects}
            />
          </div>
        );
      })}

      <button
        className="btn btn-secondary"
        aria-label="Customise options"
        type="button"
        onClick={addAward}
      >
        + Add prize level
      </button>
    </div>
  );
}

function Projects({
  index,
  awardsIndex,
  control,
  register,
  errors,
  projects,
}: {
  index: number;
  awardsIndex: number;
  control: Control<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  projects: Project[];
}) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `result.${index}.awards.${awardsIndex}.teamIds`,
    }
  );
  let [search, setSearch] = useState("");
  let projects_ = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  let addProject = (projectId: string) => () => {
    append({
      teamId: projectId,
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
          let project = projects.find((p) => p.teamId === field.teamId);
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
          Please add projects for this prize level
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
                let selected = fields.some((f) => f.teamId === proj.teamId);
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
