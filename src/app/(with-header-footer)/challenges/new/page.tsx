"use client";
import { Input } from "@/components/form/input";
import { TextArea } from "@/components/form/textarea";
import { validationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    title: validationSchema.text,
    hostName: validationSchema.text,
    description: validationSchema.text,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export default function Page() {
  let {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  let onSubmit = (formData: Inputs) => {};

  return (
    <div className="container my-4 pt-20 flex flex-1 ">
      <div className="w-full">
        <div className="text-[20px] py-4 mb-4 border-b  border-b-white/20">
          Edit Basic Campaign Information
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="py-2">
            <Input
              label="Campaign Title"
              {...register("title")}
              error={errors["title"]}
            />
          </fieldset>
          <fieldset className="py-2">
            <Input
              label="Host Name"
              {...register("hostName")}
              error={errors["hostName"]}
            />
          </fieldset>

          <fieldset className="py-2">
            <TextArea
              label="Campaign Description"
              {...register("description")}
              error={errors["description"]}
            />
          </fieldset>

          <div className="py-8 flex justify-end">
            <button className="btn btn-primary" type="submit">
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
``;
