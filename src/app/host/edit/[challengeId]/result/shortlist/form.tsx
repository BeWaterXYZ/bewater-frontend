"use client";
import { DatePicker } from "@/components/form/datepicker";
import { validationSchema } from "@/schema";
import { Challenge, Project } from "@/services/types";
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

const schema = z.object({
  announceShortlist: z.string().optional(),
  tracks: z.array(
    z.object({
      id: z.string().optional(),
      name: validationSchema.text,
      projects: z.array(z.object({ id: z.string() })),
      enabled: z.boolean(),
    })
  ),
});

type Inputs = z.infer<typeof schema>;

export function Shortlist({
  challenge,
  projects,
}: {
  challenge: Challenge;
  projects: Project[];
}) {
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
      tracks: (challenge.track ?? []).map((t) => ({
        name: t,
        projects: [],
        enabled: true,
      })),
    },
  });
  let [announceNow, announceNowSet] = useState("0");
  const onSubmit = async (formData: Inputs) => {
    // console.log(formData);
    try {
      // await mutation.mutateAsync({
      //   id: challenge.id,
      //   ...formData,
      // });
    } catch (err) {}
  };
  const { fields } = useFieldArray({
    control,
    name: "tracks",
  });
  return (
    <div>
      <div className="my-8">
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <p className="body-2">Shortlisted projects</p>
          {fields.map((f, index) => {
            return (
              <div
                key={f.id}
                className="bg-[#11111B] border border-[#323232] p-4 my-4"
              >
                <p className="body-3">Track - ${f.name}</p>

                <Projects
                  index={index}
                  control={control}
                  register={register}
                  errors={errors}
                  projects={projects}
                />
              </div>
            );
          })}

          <p className="body-2">Announcement</p>
          <p className="body-3 text-grey-600 mb-4">
            The results will be publicly displayed at the campaign page, and a
            notification email will be posted to the team members in the
            results.{" "}
          </p>

          <RadioGroup.Root
            className="flex flex-col gap-2"
            defaultValue={announceNow}
            value={announceNow}
            onValueChange={(v) => {
              announceNowSet(v);
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
                Scheduled announcement time
              </label>
            </div>
          </RadioGroup.Root>

          <DatePicker
            label="Start Date"
            control={control}
            onValueChange={(v) => setValue("announceShortlist", v)}
            {...register("announceShortlist")}
            error={errors["announceShortlist"]}
          />
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
      name: `tracks.${index}.projects`,
    }
  );
  return (
    <div>
      <p className="body-4 text-grey-600 pt-2">Projects</p>
      {fields.map((field, i) => {
        return (
          <div className=" grid grid-cols-3 gap-4" key={field.id}>
            {field.id}
          </div>
        );
      })}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="IconButton"
            aria-label="Customise options"
            type="button"
          >
            + Add projects
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
            123
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
