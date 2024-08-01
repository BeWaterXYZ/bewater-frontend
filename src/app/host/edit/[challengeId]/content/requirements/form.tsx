"use client";
import { TextArea } from "@/components/form/textarea";
import { validationSchema } from "@/schema";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { Challenge } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    requirements: validationSchema.text,
    reviewDimension: validationSchema.text,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function Requirements({ challenge }: { challenge: Challenge }) {
  let mutation = useMutationUpdateChallenge(challenge.id);

  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      requirements: challenge.requirements,
      reviewDimension: challenge.reviewDimension,
    },
  });

  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        ...formData,
      });
    } catch (err) {}
  };
  return (
    <div className="font-secondary">
      <div className="z-30  top-0 right-0 h-full  w-full  p-8 overflow-y-auto">
        <div className="text-xl leading-8 text-white py-4 mb-4 border-b  border-b-white/20">
          Requirements Information
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <fieldset className="">
            <TextArea
              label="Requirements"
              rows={5}
              {...register("requirements")}
              error={errors["requirements"]}
            />
          </fieldset>
          <fieldset className="">
            <TextArea
              label="Criteria"
              rows={5}
              {...register("reviewDimension")}
              error={errors["reviewDimension"]}
            />
          </fieldset>
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
