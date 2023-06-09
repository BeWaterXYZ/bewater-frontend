"use client";
import { DatePicker } from "@/components/form/datepicker";
import { Input } from "@/components/form/input";
import { Radio } from "@/components/form/radio";
import { TextArea } from "@/components/form/textarea";
import { validationSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  let [isOnlineOnly, isOnlineOnlySet] = useState(true);
  let schema = z.object({
    type: z.string(),
    title: validationSchema.text,
    hostName: validationSchema.text,
    description: validationSchema.text,
    location: z.string(),
    city: isOnlineOnly ? z.string().optional() : validationSchema.text,
    startTime: validationSchema.date,
    endTime: validationSchema.date,
  });
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
      type: "hackathon",
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
          <label className="block text-[12px] py-1 text-grey-500 font-bold  ">
            Campaign Type
          </label>
          <Radio
            control={control}
            name="type"
            onValueChange={(v) => setValue("location", v)}
            options={[
              {
                value: "hackathon",
                label: (
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <Image
                      src="/assets/hackathon.png"
                      width={64}
                      height={64}
                      alt="hackathon"
                    />
                    Hackathon
                  </div>
                ),
              },
              {
                value: "demoday",
                label: (
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <Image
                      src="/assets/demoday.png"
                      width={64}
                      height={64}
                      alt="hackathon"
                    />
                    Demo day
                  </div>
                ),
              },
              {
                value: "workshop",
                label: (
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <Image
                      src="/assets/workshop.png"
                      width={64}
                      height={64}
                      alt="hackathon"
                    />
                    Workshop
                  </div>
                ),
              },
            ]}
          />
          <Input
            label="Campaign Title"
            {...register("title")}
            error={errors["title"]}
          />
          <Input
            label="Host Name"
            {...register("hostName")}
            error={errors["hostName"]}
          />

          <TextArea
            label="Campaign Description"
            {...register("description")}
            error={errors["description"]}
          />
          <Radio
            label="Campaign mode"
            control={control}
            name="location"
            error={errors['location']}
            onValueChange={(v) => setValue("location", v)}
            options={[
              { value: "online", label: "Online" },
              { value: "offline", label: "Offline" },
              { value: "mixed", label: "Online + Offline" },
            ]}
          />
          {isOnlineOnly ? null : (
            <Input label="City" {...register("city")} error={errors["city"]} />
          )}
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              label="Start Date"
              {...register("startTime")}
              error={errors["startTime"]}
            />
            <DatePicker
              label="End Date"
              {...register("endTime")}
              error={errors["endTime"]}
            />
          </div>

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
