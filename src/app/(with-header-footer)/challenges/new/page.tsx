"use client";
import { Input } from "@/components/form/input";
import { Radio } from "@/components/form/radio";
import { TextArea } from "@/components/form/textarea";
import { validationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  const [isOnlineOnly, isOnlineOnlySet] = useState(true);
  const schema = z
    .object({
      title: validationSchema.text,
      hostName: validationSchema.text,
      description: validationSchema.text,
      location: validationSchema.text,
      city: z.string().optional(),
    })
    .required();

  type Inputs = z.infer<typeof schema>;

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
      location: "online",
    },
  });
  let onSubmit = (formData: Inputs) => {
    console.log({ formData });
  };
  watch((data) => {
    isOnlineOnlySet(data.location === "online");
  });

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
          <fieldset className="py-2">
            <label className="block text-[12px] py-1 text-grey-500 font-bold  ">
              Campaign mode
            </label>
            <Radio
              control={control}
              name="location"
              onValueChange={(v) => setValue("location", v)}
              options={[
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
                { value: "mixed", label: "Online + Offline" },
              ]}
            />
          </fieldset>
          {isOnlineOnly ? null : (
            <fieldset className="py-2">
              <Input
                label="City"
                {...register("city")}
                error={errors["city"]}
              />
            </fieldset>
          )}

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
