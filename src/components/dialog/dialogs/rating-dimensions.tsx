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
      fill="#CBD5E1"
      d="M4 4V3a2 2 0 114 0v1h.5A1.5 1.5 0 0110 5.5v4A1.5 1.5 0 018.5 11h-5A1.5 1.5 0 012 9.5v-4A1.5 1.5 0 013.5 4H4zm1-1v1h2V3a1 1 0 00-2 0zM3.5 5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-5z"
    ></path>
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
      scoreDimension: data.challenge.scoreDimension,
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
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6">Dimensions</p>
      <p className="body-3 text-grey-500">
        At least one dimensions are required.
      </p>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
        {fields.map((field, index) => {
          return (
            <div
              className="relative flex gap-2 items-center w-full "
              key={field.id}
            >
              {field.locked ? (
                <div className="pb-4">{lock}</div>
              ) : (
                <div
                  className="pb-4"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  {<TrashIcon className="text-white" />}
                </div>
              )}
              <Input
                className="flex-1"
                label=""
                disabled={field.locked}
                {...register(`scoreDimension.${index}.text`)}
                error={errors.scoreDimension?.[index]?.text}
              />
            </div>
          );
        })}
        <button
          type="button"
          className="text-[12px] text-grey-300"
          onClick={() => {
            append({
              text: "",
              locked: false,
            });
          }}
        >
          + Add a new dimension
        </button>
        <div className="flex mt-6 justify-end">
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
