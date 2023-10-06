"use client";
import { DatePicker } from "@/components/form/datepicker";
import { Input } from "@/components/form/input";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { Challenge, defaultMileStones } from "@/services/types";
import { validationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cross2Icon,
  DrawingPinFilledIcon,
  MinusIcon,
  Pencil1Icon,
  PinTopIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Select } from "@/components/form/control";
import { addHours, compareAsc, parseISO, subHours } from "date-fns";
import clsx from "clsx";

const timezones = [
  -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12,
].map((tz) => ({
  value: tz.toString(),
  label: "UTC" + (tz === 0 ? "" : tz > 0 ? "+" + tz : tz),
  classes: {
    container: " !bg-transparent  h-5  my-0",
    text: "!text-grey-400 body-4 leading-5 !py-0",
  },
}));

const schema = z
  .object({
    timezone: z.array(z.string()),
    milestones: z.array(
      z.object({
        dueDate: validationSchema.date,
        stageName: validationSchema.text,
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditMilestones({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let [sameTime, sameTimeSet] = useState(false);
  let mutation = useMutationUpdateChallenge(challenge.id);

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
      timezone: ["0"],
      // todo 时间线编辑2.0。当前隐藏 NOP 阶段
      milestones: challenge.milestones
        .filter((ms) => {
          return ms.stageName === "NOP" ? false : true;
        })
        .map((ms) => ({
          ...ms,
          dueDate: ms.dueDate.substring(0, 10),
        })),
    },
  });

  let sameTimeToggle = () => {
    sameTimeSet(!sameTime);
    let i = challenge.milestones.findIndex(
      (m) => m.stageName === "Project Submission"
    );
    setValue(`milestones.${i}.dueDate`, challenge.startTime.substring(0, 10));
  };
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "milestones", // unique name for your Field Array
    });

  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        milestones: formData.milestones.map((ms) => ({
          ...ms,
          dueDate: subHours(
            parseISO(ms.dueDate + "T00:00:00.000Z"),
            parseInt(formData.timezone[0])
          ).toISOString(),
        })),
      });
      openSet(false);
    } catch (err) {}
  };
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary-invert ">Edit </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content
          className="z-30 bg-[#141527]  fixed top-0 right-0 h-full  w-full md:w-[500px] p-8 overflow-y-auto"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
            Milestone Information
          </Dialog.Title>
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
                  {...register("timezone")}
                />
              </div>
              <div className="flex flex-row gap-4">
                <label className=" flex-1 flex text-[12px] my-2 text-grey-500">
                  Date
                </label>
                <label className=" flex-1 flex  text-[12px] my-2 text-grey-500">
                  Milestone Name
                </label>
              </div>

              {fields.map((field, index) => {
                let isDefault = defaultMileStones.some(
                  (d) => d === field.stageName
                );
                return (
                  <div
                    className="relative flex flex-row gap-4 my-2 pt-1"
                    key={field.id}
                  >
                    <DatePicker
                    disabled={sameTime &&  field.stageName === 'Project Submission'}
                      control={control}
                      label={
                        <div className="flex gap-1">
                          {isDefault ? (
                            <DrawingPinFilledIcon />
                          ) : (
                            <Pencil1Icon />
                          )}
                          {field.stageName || "Customized"}
                        </div>
                      }
                      onValueChange={(v) =>
                        setValue(`milestones.${index}.dueDate`, v)
                      }
                      {...register(`milestones.${index}.dueDate`)}
                      error={errors[`milestones`]?.[index]?.dueDate}
                    />
                    {!isDefault ? (
                      <Input
                        {...register(`milestones.${index}.stageName`)}
                        error={errors.milestones?.[index]?.stageName}
                      />
                    ) : (
                      <Input disabled value={field.stageName} />
                    )}
                    <div className="flex gap-2 pb-5">
                      <button
                        className="  text-grey-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          insert(index + 1, { dueDate: "", stageName: "" });
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
              className={clsx(
                "body-3 flex items-center my-1 cursor-pointer"
                // on ? 'text-white' : 'text-[#94A3B8]',
              )}
            >
              <input
                className="mr-2 w-4 h-4 block accent-[#00FFFF]"
                type="checkbox"
                checked={sameTime}
                onChange={sameTimeToggle}
              ></input>
              <span>{"赛事开始时，项目提交也同时开启"}</span>
            </label>
            <p className="body-3 text-grey-500">
              说明：线下赛事以现场公布的时间为准。
            </p>
            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit">
                Save{" "}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
