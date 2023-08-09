"use client";
import { DatePicker } from "@/components/form/datepicker";
import { Input } from "@/components/form/input";
import { Radio } from "@/components/form/radio";
import { TextArea } from "@/components/form/textarea";
import { Loading } from "@/components/loading/loading";
import { CAMPAIGN_TYPE, LOCATION } from "@/constants";
import { createChallenge } from "@/services/challenge";
import { validationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Challenge } from "@/services/types";
import Link from "next/link";

const init: Partial<Challenge> = {
  requirements: "",
  reviewDimension: "",
  milestones: [
    {
      dueDate: "2023-06-22",
      stageName: "Preparation",
    },
    {
      dueDate: "2023-06-23",
      stageName: "Teaming",
    },
    {
      dueDate: "2023-06-24",
      stageName: "Project Submission",
    },
    {
      dueDate: "2023-06-25",
      stageName: "Review",
    },
    {
      dueDate: "2023-06-26",
      stageName: "Result",
    },
  ],
};
export default function Page() {
  let router = useRouter();
  let [showFullScreen, showFullScreenSet] = useState(false);
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
      location: LOCATION.ONLINE,
      type: CAMPAIGN_TYPE.CHALLENGE,
    },
  });

  let onSubmit = async (formData: Inputs) => {
    try {
      let data = await createChallenge({
        ...formData,
        ...init,
      });
      showFullScreenSet(true);
      setTimeout(() => {
        router.push(`/host/challenges/${data.id}`);
      }, 3000);
    } catch (err) {}
    console.log({ formData });
  };
  watch((data) => {
    isOnlineOnlySet(data.location === LOCATION.ONLINE);
  });

  return (
    <>
      <div className="container my-4 pt-20 flex flex-1 justify-center">
        <div className="w-full max-w-[800px]">
          <Link href="/host" className="text-grey-500">
            {"< Back"}
          </Link>
          <div className="text-xl leading-8 text-white pb-4 mt-8 mb-8 border-b  border-b-white/20">
            Edit Basic Campaign Information
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-xs text-grey-500 font-bold mb-2">
              Campaign Type
            </label>
            <Radio
              control={control}
              name="type"
              onValueChange={(v) => setValue("type", v)}
              options={[
                {
                  value: CAMPAIGN_TYPE.HACKATHON,
                  label: (
                    <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
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
                  value: CAMPAIGN_TYPE.DEMODAY,
                  label: (
                    <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
                      <Image
                        src="/assets/demoday.png"
                        width={64}
                        height={64}
                        alt="demoday"
                      />
                      Demo day
                    </div>
                  ),
                },
                {
                  value: CAMPAIGN_TYPE.WORKSHOP,
                  label: (
                    <div className="flex flex-col md:flex-row items-center gap-2 text-grey-300">
                      <Image
                        src="/assets/workshop.png"
                        width={64}
                        height={64}
                        alt="workshop"
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
              rows={5}
              {...register("description")}
              error={errors["description"]}
              placeholder="Please write a brief introduction about this event, including the format and other relevant information. You may briefly describe the event's origin, development history, and emphasize its unique features and significance. The event introduction should be concise, factual, and provide participants, spectators, and media with a quick understanding of the event's details. Let's create a favorable public atmosphere for the smooth running of the event."
            />
            <Radio
              label="Campaign mode"
              control={control}
              name="location"
              error={errors["location"]}
              onValueChange={(v) => setValue("location", v)}
              options={[
                { value: LOCATION.ONLINE, label: LOCATION.ONLINE },
                { value: LOCATION.OFFLINE, label: "Offline" },
                { value: LOCATION.MIXED, label: "Online + Offline" },
              ]}
            />
            {isOnlineOnly ? null : (
              <Input
                label="City"
                {...register("city")}
                error={errors["city"]}
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Start Date"
                control={control}
                onValueChange={(v) => setValue("startTime", v)}
                {...register("startTime")}
                error={errors["startTime"]}
              />
              <DatePicker
                label="End Date"
                control={control}
                onValueChange={(v) => setValue("endTime", v)}
                {...register("endTime")}
                error={errors["endTime"]}
              />
            </div>

            <div className="py-8 flex justify-end">
              <button className="btn btn-primary" type="submit">
                Create campaign
              </button>
            </div>
          </form>
        </div>
      </div>

      {showFullScreen ? (
        <div className="z-[100] fixed top-0  bottom-0 left-0 right-0 flex flex-col gap-2 justify-center items-center bg-night">
          <div className="h-32 w-32 relative bg-night">
            <Loading cover={false} />
          </div>
          <p className="text-[14px]">Created Success!</p>
          <p className="text-[14px] text-grey-500">
            Next let’s edit your campaign web page.
          </p>
        </div>
      ) : null}
    </>
  );
}
