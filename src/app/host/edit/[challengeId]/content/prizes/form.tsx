"use client";
import { Input } from "@/components/form/input";
import { UploaderInput } from "@/components/form/uploader";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { Challenge } from "@/services/types";
import { validationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
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
    keySponsors: z.array(z.object({
        uri: validationSchema.text,
        href: z.string().optional(),
    }).or(validationSchema.text)),
    awardAssorts: z.array(
      z.object({
        name: validationSchema.text,
        awards: z.array(
          z.object({
            awardName: validationSchema.text,
            amount: validationSchema.nonNegative,
            count: validationSchema.positive,
          })
        ),
      })
    ),
    totalAward: validationSchema.nonNegative,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function Prizes({ challenge }: { challenge: Challenge }) {
  let mutation = useMutationUpdateChallenge(challenge.id);

  let [totalAward, totalAwardSet] = useState(0);
  // console.log(challenge.keySponsors);
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
      // fixme
      awardAssorts: (challenge.awardAssorts ?? []).map((aa) => {
        return {
          ...aa,
          awards: aa.awards.map((a) => ({
            ...a,
            amount: a.amount.toString(),
            count: a.count.toString(),
          })),
        };
      }),
      keySponsors: challenge.keySponsors ?? [],
      awardCurrency: challenge.awardCurrency ? challenge.awardCurrency : "USDT",
      totalAward: `${challenge.totalAward ?? 0}`,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "awardAssorts", // unique name for your Field Array
    }
  );
  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        keySponsors: formData.keySponsors,
        totalAward: parseInt(formData.totalAward),
        awardCurrency: formData.awardCurrency,
        // fixme
        awardAssorts: formData.awardAssorts.map((aa) => {
          return {
            ...aa,
            awards: aa.awards.map((a) => ({
              ...a,
              amount: +a.amount,
              count: +a.count,
            })),
          };
        }),
      });
    } catch (err) {}
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

      <div>
        <div className="z-30   top-0 right-0 h-full  w-full  p-8 overflow-y-auto">
          <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
            Awards Information
          </div>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
            {fields.map((field, index) => {
              return (
                <div
                  className="relative mb-4 border-b border-grey-800"
                  key={field.id}
                >
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
                  <button
                    className="absolute right-0 top-0 text-grey-500 flex items-center text-[12px]"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <Cross2Icon className="mr-1 text-grey-500" />
                    Remove
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              className="text-[12px] text-grey-300 flex"
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
              <PlusIcon className="mr-1 text-grey-300" /> Add a new track
            </button>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Input
                label="Total Award"
                {...register(`totalAward`)}
                error={errors["totalAward"]}
              />
              { /* 解决summary货币无法相加 */ }
              <Input
                label="Award Currency"
                placeholder="USDT"
                disabled
                {...register(`awardCurrency`)}
                error={errors["awardCurrency"]}
              />
            </div>

            <UploaderInput
              control={control}
              label={"Key Sponsors Logo"}
              name={`keySponsors`}
              title="Upload "
              subTitlte="JPG/PNG, 40px height"
              max={10}
              width={200}
              height={70}
              onValueChange={(v) => {
                setValue(`keySponsors`, v as string[]);
              }}
            />

            <div className="flex mt-6 justify-end">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
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
    <div className="mb-2">
      <div className="grid grid-cols-3 gap-4">
        <label className=" block text-[12px] my-2 text-grey-500">
          Award Name
        </label>
        <label className=" block text-[12px] my-2 text-grey-500">Count</label>{" "}
        <label className=" block text-[12px] my-2 text-grey-500">Amount</label>
      </div>
      {fields.map((field, i) => {
        return (
          <div className="relative grid grid-cols-3 gap-4" key={field.id}>
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
            <button
              className="absolute m-2 left-full top-1 text-grey-500"
              onClick={() => {
                remove(i);
              }}
            >
              <Cross2Icon />
            </button>
          </div>
        );
      })}
      <button
        type="button"
        className="text-[12px] text-grey-300 flex"
        onClick={() => {
          append({
            awardName: "",
            count: "1",
            amount: "1000",
          });
        }}
      >
        <PlusIcon className="mr-1 text-grey-300" /> Add a new award
      </button>
    </div>
  );
}
