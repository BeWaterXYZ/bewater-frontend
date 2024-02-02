"use client";
import { Input } from "@/components/form/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/schema";
import { z } from "zod";
import { Challenge } from "@/services/types";
import { UploaderInput } from "@/components/form/uploader";
import { Radio } from "@/components/form/radio";
import { DatePicker } from "@/components/form/datepicker";
import { LOCATION } from "@/constants";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { zoneLiteral } from "@/utils/time-zone";

export function Hero({ challenge }: { challenge: Challenge }) {
  let mutation = useMutationUpdateChallenge(challenge.id);

  let [isOnlineOnly, isOnlineOnlySet] = useState(
    challenge.location === LOCATION.ONLINE
  );

  const zoneCity = zoneLiteral(true);
  const zone = zoneLiteral(false);

  const schema = z.object({
    title: validationSchema.text,
    hostIcon: z.string().nullable(),
    bannerUrl: validationSchema.image,
    location: z.string(),
    city: isOnlineOnly ? z.string().optional() : validationSchema.zhName,
    startTime: validationSchema.date,
    endTime: validationSchema.date,
    joinLink: z.string().optional(),
    linkText: z.string().optional(),
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
      title: challenge.title,
      hostIcon: challenge.hostIcon ?? "",
      bannerUrl: challenge.bannerUrl ?? "",
      location: challenge.location,
      city: challenge.city ?? "",
      linkText: challenge.linkText ?? "",
      joinLink: challenge.joinLink ?? "",
      startTime: challenge.startTime,
      endTime: challenge.endTime,
    },
  });
  watch((data) => {
    isOnlineOnlySet(data.location === LOCATION.ONLINE);
  });
  const onSubmit = async (formData: Inputs) => {
    // console.log(formData);
    try {
      await mutation.mutateAsync({
        id: challenge.id,
        ...formData,
      });
    } catch (err) {}
  };
  return (
    <div className="font-secondary">
      <div className="z-30 top-0 right-0 h-full  w-full p-8 overflow-y-visible">
        <div className="text-xl leading-8 text-white py-4 mb-4 border-b border-b-white/20">
          Hero Information
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
          <div className="my-4">
            <UploaderInput
              label="Hero Image"
              title="Upload the banner image"
              subTitlte="PNG or JPG, 1440*560px"
              max={1}
              height={140}
              width={447}
              control={control}
              name="bannerUrl"
              error={errors["bannerUrl"]}
              onValueChange={(v) => {
                setValue("bannerUrl", v as string);
              }}
            />
          </div>
          <div className="my-4">
            <UploaderInput
              label="Host Logo"
              title="Upload the host image"
              subTitlte="PNG, 40px height"
              width={1000}
              height={140}
              max={1}
              control={control}
              name="hostIcon"
              error={errors["hostIcon"]}
              onValueChange={(v) => {
                setValue("hostIcon", v as string);
              }}
            />
          </div>
          <>
            <Input
              label="Campaign Title"
              {...register("title")}
              error={errors["title"]}
            />
            <Input
              label="Link URL"
              disabled={challenge.type === "CHALLENGE"}
              {...register("joinLink")}
              error={errors["joinLink"]}
            />
            <Input
              label="Link Text"
              disabled={challenge.type === "CHALLENGE"}
              {...register("linkText")}
              error={errors["linkText"]}
            />
          </>
          <Radio
            label="Campaign mode"
            control={control}
            error={errors["location"]}
            name="location"
            onValueChange={(v) => setValue("location", v)}
            options={[
              { value: LOCATION.ONLINE, label: "Online" },
              { value: LOCATION.OFFLINE, label: "Offline" },
              { value: LOCATION.MIXED, label: "Both" },
            ]}
          />
          {isOnlineOnly ? null : (
            <Input label="City" {...register("city")} error={errors["city"]} />
          )}
          <div className="grid grid-cols-2 gap-4">
            <DatePicker
              showTimeSelect
              dateFormat="yyyy/MM/dd HH:mm"
              label={`Start Date (${zoneCity})`}
              control={control}
              onValueChange={(v) => setValue(`startTime`, v)}
              {...register("startTime")}
              error={errors["startTime"]}
            />
            <DatePicker
              showTimeSelect
              dateFormat="yyyy/MM/dd HH:mm"
              label={`End Date (${zone})`}
              control={control}
              onValueChange={(v) => setValue(`endTime`, v)}
              {...register("endTime")}
              error={errors["endTime"]}
            />
          </div>
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
