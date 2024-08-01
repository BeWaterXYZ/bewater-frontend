import { useLoadingStoreAction } from "@/components/loading/store";
import { useToastStore } from "@/components/toast/store";
import { validationSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Dialogs } from "../store";
import { useMutationUpdateChallenge } from "@/services/challenge.query";
import { TrashIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/form/control";
import { AxiosError } from "axios";

const lock = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 12 12"
  >
    <path
      fill="currentColor"
      d="M4 4V3a2 2 0 114 0v1h.5A1.5 1.5 0 0110 5.5v4A1.5 1.5 0 018.5 11h-5A1.5 1.5 0 012 9.5v-4A1.5 1.5 0 013.5 4H4zm1-1v1h2V3a1 1 0 00-2 0zM3.5 5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-5z"
    ></path>
  </svg>
);
const add = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_6066_138153)">
      <path
        d="M8 3.83398L8 12.1673"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1663 8L3.83301 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_6066_138153">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const schema = z
  .object({
    scoreDimension: z.array(
      z.object({
        text: validationSchema.text,
        locked: z.boolean().optional(),
      })
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface RatingDimensionsDialogProps {
  data: NonNullable<Dialogs["rating_dimensions"]>;
  close: () => void;
}

export default function RatingDimensionsDialog({
  data,
  close,
}: RatingDimensionsDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);

  let {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      scoreDimension: data.challenge.scoreDimension
        ? data.challenge.scoreDimension
        : [
            { text: "Creativity and Innovation", locked: true },
            { text: "Technical Implementation and Quality", locked: false },
            { text: "User Experience and Visual Design", locked: false },
          ],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "scoreDimension", // unique name for your Field Array
    }
  );
  let mutation = useMutationUpdateChallenge(data.challenge.id);

  const onSubmit = async (formData: Inputs) => {
    try {
      await mutation.mutateAsync({
        id: data.challenge.id,
        ...formData,
      });
      addToast({
        type: "success",
        title: "Updated",
      });
      close();
    } catch (err) {
      addToast({
        type: "error",
        title: (err as AxiosError<{ message: string }>)?.response?.data
          ?.message,
      });
    }
  };

  return (
    <div className="font-secondary flex flex-col justify-center w-[80vw] max-w-md">
      <p className="text-lg font-bold text-grey-200">Dimensions</p>
      <p className="text-sm text-grey-500 mb-6">
        At least one dimensions are required.
      </p>
      <p className="text-xs font-bold text-white mb-2">Dimensions name</p>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
        {fields.map((field, index) => {
          return (
            <div
              className="relative flex gap-2 items-start w-full"
              key={field.id}
            >
              <Input
                className="flex-1"
                label=""
                // disabled={field.locked}
                inputClassName="mb-[2px]"
                errorClassName="pl-2 mb-[6px]"
                preserveSpaceForErrorMessage={false}
                {...register(`scoreDimension.${index}.text`)}
                error={errors.scoreDimension?.[index]?.text}
              />
              <div className="h-[39px] w-5 flex text-grey-500">
                {field.locked ? (
                  <div className="scale-[1.333] m-auto cursor-not-allowed">
                    {lock}
                  </div>
                ) : (
                  <div
                    className="scale-[1.2] m-auto cursor-pointer"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    {<TrashIcon />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <button
          type="button"
          className="my-4 text-xs text-[#00FFFF] flex items-center"
          onClick={() => {
            append({
              text: "",
              locked: false,
            });
          }}
        >
          <div className="mr-2">{add}</div>
          <div>Add a new dimension</div>
        </button>
        <div className="text-xs pb-6">
          <p className="font-bold text-white mb-2">Score Range</p>
          <p className="text-grey-300">
            Each dimension should be scored on a scale of 0 to 10.
            <br />
            If you have special needs, please contact us.
          </p>
        </div>
        <div className="flex mt-6 justify-end">
          <button className="btn btn-secondary mr-2" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
