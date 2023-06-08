"use client";
import { Input } from "@/components/form/input";
import { UploaderInput } from "@/components/form/uploader";
import { Challenge } from "@/services/types";
import { validationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    awardCurrency: z.string().min(1, "min 1 character"),
    sponsors: z.array(validationSchema.image),
    awardAssorts: z.array(
      z.object({
        name: validationSchema.text,
        awards: z.array(
          z.object({
            awardName: validationSchema.text,
            amount: validationSchema.positive,
            count: validationSchema.positive,
          })
        ),
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function EditAwards({ challenge }: { challenge: Challenge }) {
  let [open, openSet] = useState(false);
  let [totalAward, totalAwardSet] = useState(0);

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
      awardAssorts: [],
      sponsors: [],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "awardAssorts", // unique name for your Field Array
    }
  );
  const onSubmit = async (formData: Inputs) => {
    console.log({ formData });
  };
  watch((data) => {
    let total =
      data.awardAssorts?.reduce((prev, cur) => {
        return (
          prev +
          cur!.awards!.reduce((p, c) => {
            return (
              p + parseInt(c?.amount ?? "0", 10) * parseInt(c?.count ?? "0", 10)
            );
          }, 0)
        );
      }, 0) ?? 0;
    totalAwardSet(total);
  });
  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <button className="btn btn-secondary-invert ">Edit </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content className="z-30 bg-[#141527]  fixed top-0 right-0 h-full  w-full md:w-[500px] p-8 overflow-y-auto">
          <Dialog.Title className="text-[20px] py-4 mb-4 border-b  border-b-white/20">
            Awards Information
          </Dialog.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            {fields.map((field, index) => {
              return (
                <div className="mb-4 border-b border-grey-800" key={field.id}>
                  <Input
                    label="Track Name"
                    {...register(`awardAssorts.${index}.name`)}
                    error={errors["awardAssorts"]?.[index]?.["name"]}
                  />
                  <Awards
                    index={index}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                </div>
              );
            })}

            <button
              type="button"
              className="text-[12px] text-grey-300"
              onClick={() => {
                append({
                  name: "",
                  awards: [
                    {
                      awardName: "1st award",
                      count: "1",
                      amount: "3000",
                    },
                    {
                      awardName: "2nd award",
                      count: "1",
                      amount: "2000",
                    },
                    {
                      awardName: "3rd award",
                      count: "1",
                      amount: "1000",
                    },
                  ],
                });
              }}
            >
              + Add a new track
            </button>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Total Award " disabled value={totalAward} />
              <Input
                label="Award Currency"
                placeholder="USD/ETH"
                {...register(`awardCurrency`)}
                error={errors["awardCurrency"]}
              />
            </div>

            <UploaderInput
              control={control}
              label={"Key Sponsors Logo"}
              name={`sponsors`}
              title="Upload "
              subTitlte="JPG/PNG, 40px height"
              max={10}
              height={140}
              width={200}
              onValueChange={(v) => {
                setValue(`sponsors`, v as string[]);
              }}
            />

            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Awards({
  index,
  control,
  register,
  errors,
}: {
  index: number;
  control: Control<Inputs>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
}) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: `awardAssorts.${index}.awards`, // unique name for your Field Array
    }
  );

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <label className=" block text-[12px] my-2 text-grey-500">
          Award Name
        </label>
        <label className=" block text-[12px] my-2 text-grey-500">Count</label>{" "}
        <label className=" block text-[12px] my-2 text-grey-500">Amount</label>
      </div>
      {fields.map((field, i) => {
        return (
          <div className="grid grid-cols-3 gap-4" key={field.id}>
            <Input
              placeholder="Award Name"
              {...register(`awardAssorts.${index}.awards.${i}.awardName`)}
              error={
                errors["awardAssorts"]?.[index]?.["awards"]?.[i]?.["awardName"]
              }
            />
            <Input
              {...register(`awardAssorts.${index}.awards.${i}.count`)}
              error={
                errors["awardAssorts"]?.[index]?.["awards"]?.[i]?.["count"]
              }
            />
            <Input
              {...register(`awardAssorts.${index}.awards.${i}.amount`)}
              error={
                errors["awardAssorts"]?.[index]?.["awards"]?.[i]?.["amount"]
              }
            />
          </div>
        );
      })}
      <button
        type="button"
        className="text-[12px] text-grey-300"
        onClick={() => {
          append({
            awardName: "",
            count: "1",
            amount: "1000",
          });
        }}
      >
        + Add a new award
      </button>
    </div>
  );
}
