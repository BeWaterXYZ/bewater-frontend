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
import {
  useMutationUpdateChallenge,
  useMutationUpdateShortlist,
} from "@/services/challenge.query";
import { Switch } from "@/components/form/switch";
import { Input } from "@/components/form/control";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@radix-ui/react-icons";
import { useToastStore } from "@/components/toast/store";

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
      track: "",
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
      <div className="my-8">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <p className="body-2">Final result</p>
          {fields.map((f, index) => {
            return (
              <div
                key={f.id}
                className="bg-[#0B0C24] border border-[#323232] p-4 my-4"
              >
                <div className="flex justify-between">
                  <p className="body-3">Track - {f.track}</p>
                  <div className="flex">
                    <button
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
                    </button>
                    {/* <Switch
                      control={control}
                      name={`shortlist.${index}.display`}
                      label={""}
                      onValueChange={(v) => {
                        setValue(`shortlist.${index}.display`, v);
                      }}
                    /> */}
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
            );
          })}

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
            The final results will be publicly displayed on the event page and a
            notification email will be sent to the project team members.
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
              onValueChange={(v) => setValue("announceResult", v)}
              {...register("announceResult")}
              error={errors["announceResult"]}
            />
          )}

          <button className="btn btn-primary my-8">Save</button>
        </form>
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
                <button className="text-grey-300" onClick={removeAward(i)}>
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
            <div className="max-h-[400px] overflow-y-scroll">
              {projects_.map((proj) => {
                let selected = fields.some((f) => f.teamId === proj.teamId);
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
