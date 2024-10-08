"use client";
import { Select } from "@/components/form/control";
import { DatePicker } from "@/components/form/datepicker";
import { Input } from "@/components/form/input";
import { validationSchema } from "@/schema";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import {
  Challenge,
  Milestone as MilestoneType,
  minusMileStones,
} from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DrawingPinFilledIcon,
  MinusIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { parseISO, subHours } from "date-fns";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { enZoneCity, zhZoneCity } from "@/utils/time-zone";
import { defMilestoneArr as defValArr } from "@/utils/default";

const schema = z
  .object({
    timezone: z.array(z.string()),
    milestones: z.array(
      z.object({
        dueDate: validationSchema.date,
        stageName: validationSchema.text,
        showName: validationSchema.str,
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function Milestone({ challenge }: { challenge: Challenge }) {
  const orgMilestones =
    Array.isArray(challenge.milestones) && challenge.milestones.length > 0
      ? challenge.milestones.map((ms) => ({
          ...ms,
        }))
      : (defValArr as MilestoneType[]);

  const [{ dueDate }] = orgMilestones.filter((it) => {
    if (it.stageName === "Teaming") {
      return true;
    }
    return false;
  });

  const [sameTime, sameTimeSet] = useState(
    dueDate === orgMilestones[0].dueDate
  );

  if (sameTime) {
    for (const it of orgMilestones) {
      if (it.stageName === "Teaming") {
        it.showName = "Teaming";
        break;
      }
    }
  }

  const mutation = useMutationUpdateChallenge(challenge.id);
  const [zone, upZone] = useState(
    Math.floor(new Date().getTimezoneOffset() / 60)
  );
  const [topErr, upTopErr] = useState(false);

  const zhLang = navigator.language?.toLowerCase().includes("zh");

  const zoneCity = zhLang ? zhZoneCity : enZoneCity;

  const timezones = [
    -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
  ].map((tz) => ({
    value: tz.toString(),
    label:
      "UTC " +
      (tz === 0
        ? zoneCity["0"]
        : tz > 0
        ? "+" + tz + zoneCity[`${tz}`]
        : `${tz}` + zoneCity[`${tz}`]),
    classes: {
      container: " !bg-transparent  h-5  my-0",
      text: "!text-[12px]",
    },
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      timezone: [`${zone === 0 ? 0 : -zone}`],
      milestones: orgMilestones.map((ms) => ({
        ...ms,
        dueDate: parseISO(ms.dueDate).toISOString(),
      })),
    },
  });

  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace,
    update,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "milestones", // unique name for your Field Array
  });

  const sameTimeToggle = () => {
    const hit = sameTime;
    sameTimeSet(!sameTime);
    if (!hit) {
      const { milestones: tmArr } = getValues();
      const n = fields.map((ms, i) => ({
        ...ms,
        showName: tmArr[i].showName,
      }));

      for (const it of n) {
        if (it.stageName === "Teaming") {
          it.showName = "Teaming";
          it.dueDate = fields[0].dueDate;
          break;
        }
      }
      replace(n);
    }
  };

  const zoneSelectHandle = (val: any[]) => {
    const { milestones: tmArr } = getValues();
    const delta = parseInt(val[0]) - -zone;
    const n = fields.map((ms, i) => ({
      ...ms,
      dueDate: subHours(parseISO(ms.dueDate), -delta).toISOString(),
      showName: tmArr[i].showName,
    }));
    replace(n);
    upZone(parseInt(val[0]) === 0 ? 0 : -parseInt(val[0]));
  };

  const onSubmit = async (formData: Inputs) => {
    const n = formData.milestones.map((ms) => ({
      ...ms,
    }));

    const [{ dueDate }] = n.filter((it) => {
      if (it.stageName === "Teaming") {
        return true;
      }
      return false;
    });

    const sameTime = dueDate === n[0].dueDate;

    if (sameTime) {
      for (const it of n) {
        if (it.stageName === "Teaming") {
          it.showName = "";
          break;
        }
      }
    }

    for (let i = n.length - 1; i > 0; --i) {
      if (n[i].dueDate < n[i - 1].dueDate) {
        upTopErr(true);
        return;
      }
    }

    let deadlineInfo: any = null;
    let reviewInfo: any = null;
    let resultInfo: any = null;
    let reviewIndex = -1;

    for (let i = 0; i < n.length; ++i) {
      if (n[i].stageName === "Project Submission") {
        deadlineInfo = n[i];
      }
      if (n[i].stageName === "Review") {
        reviewInfo = n[i];
        reviewIndex = i;
      }
      if (n[i].stageName === "Result") {
        resultInfo = n[i];
      }
    }

    if (!reviewInfo) {
      reviewInfo = {
        dueDate: resultInfo.dueDate,
        stageName: "Review",
        showName: "",
      };
      reviewIndex = n.length - 1;
      n.splice(reviewIndex, 0, reviewInfo);
    }

    if (!deadlineInfo) {
      deadlineInfo = {
        dueDate: n[reviewIndex].dueDate,
        stageName: "Project Submission",
        showName: "",
      };
      n.splice(reviewIndex, 0, deadlineInfo);
    }

    const sysZone = -Math.floor(new Date().getTimezoneOffset() / 60);

    try {
      await mutation.mutateAsync({
        id: challenge.id,
        timeZone: -zone,
        milestones: n.map((ms) => ({
          ...ms,
          dueDate: subHours(
            parseISO(ms.dueDate),
            -zone - sysZone
          ).toISOString(),
        })) as MilestoneType[],
      });
    } catch (err) {}
  };

  return (
    <div className="font-secondary">
      <div className="z-30 top-0 right-0 h-full  w-full  p-8 overflow-y-auto">
        <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
          Milestone Information
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <div>
            <div>
              <Select
                label="Time Zone"
                required
                maxSelections={1}
                options={timezones}
                error={errors["timezone"]}
                control={control}
                usHandler={zoneSelectHandle}
                isSingle={true}
                {...register("timezone")}
              />
            </div>
            <div className="flex flex-row gap-4">
              <label className="flex-1 flex text-[12px] my-2 text-grey-500 font-bold">
                Date
              </label>
              <label className="flex-1 flex text-[12px] my-2 text-grey-500 font-bold">
                Milestone Name
              </label>
              <div className="w-[38px]"></div>
            </div>

            {fields.map((field, index) => {
              let isDefault = minusMileStones.some(
                (d) => d === field.stageName
              );
              return (
                <div
                  className="relative flex flex-row gap-4 my-2 pt-1"
                  key={field.id}
                >
                  <DatePicker
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    disabled={sameTime && field.stageName === "Teaming"}
                    control={control}
                    label={
                      <div className="flex gap-1 ">
                        {isDefault ? <DrawingPinFilledIcon /> : <Pencil1Icon />}
                        {field.stageName !== "NOP"
                          ? field.stageName === "Project Submission"
                            ? "Registration Deadline"
                            : field.stageName
                          : "Customized"}
                      </div>
                    }
                    onValueChange={(v) => {
                      if (sameTime && index === 0) {
                        let tmi = 0;
                        for (const it of fields) {
                          if (it.stageName === "Teaming") {
                            break;
                          }
                          ++tmi;
                        }
                        update(tmi, {
                          ...fields[tmi],
                          dueDate: v,
                        });
                      }

                      update(index, {
                        ...field,
                        dueDate: v,
                      });

                      upTopErr(false);
                    }}
                    {...register(`milestones.${index}.dueDate`)}
                    error={errors[`milestones`]?.[index]?.dueDate}
                  />
                  <Input
                    label="&nbsp;"
                    disabled={sameTime && field.stageName === "Teaming"}
                    {...register(`milestones.${index}.showName`)}
                    error={errors.milestones?.[index]?.showName}
                    inputClassName="h-[42px]"
                  />
                  <div className="flex gap-2 pb-5 pt-6">
                    <button
                      className={clsx("  text-grey-500", {
                        invisible:
                          field.stageName === "Result" ||
                          (field.stageName === "Preparation" && sameTime),
                      })}
                      onClick={(e) => {
                        // e.stopPropagation();
                        insert(index + 1, {
                          dueDate: "",
                          stageName: "NOP",
                          showName: "",
                        });
                      }}
                    >
                      <PlusIcon />
                    </button>
                    <button
                      className={clsx("  text-grey-500", {
                        invisible: isDefault,
                      })}
                      onClick={() => {
                        remove(index);
                        upTopErr(false);
                      }}
                    >
                      <MinusIcon />
                    </button>
                    {/* <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          move(index, Math.max(index - 1, 0));
                        }}
                      >
                        <ArrowUpIcon className="mr-1 text-grey-500" />
                      </button> */}
                    {/* <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          move(index, Math.min(index + 1, fields.length - 1));
                        }}
                      >
                        <ArrowDownIcon className="mr-1 text-grey-500" />
                      </button> */}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <button
              type="button"
              className="text-[12px] text-grey-300"
              onClick={() => {
                append({ dueDate: "", stageName: "" });
              }}
            >
              + Add a new milestone
            </button> */}
          <label
            className={clsx("body-3 flex items-start my-1 cursor-pointer")}
          >
            <input
              className="mr-2 w-4 h-4 block accent-[#00FFFF] mt-0.5"
              type="checkbox"
              checked={sameTime}
              onChange={sameTimeToggle}
            ></input>
            <span>
              {zhLang
                ? "赛事开始时，也同时开启项目提交"
                : "When the event starts, project submission also opens."}
            </span>
          </label>
          <p className="body-3 text-red-500 mt-4">
            {topErr
              ? zhLang
                ? "日期应保持升序"
                : "The date field should maintain ascending order from top to bottom"
              : ""}
          </p>
          <div className="flex mt-6 justify-end">
            <button className="btn btn-primary" type="submit">
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
