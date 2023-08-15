import { Select, TextArea } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { validationSchema } from '@/schema';
import { sendGroupingRequest } from '@/services/notification';
import { errorResponseScheme, getErrorResp } from '@/utils/error-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Dialogs } from '../store';
import { Rate } from '@/components/form/control/rating';
import {
  useFetchProjectRating,
  useMutationUpdateProjectRating,
} from '@/services/project.query';
import { add } from 'date-fns';

const schema = z
  .object({
    rating: z.array(
      z.object({
        id: z.string().optional(),
        rate: z.number().gt(0, 'please rate '),
        label: z.string(),
      }),
    ),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

interface ProjectRatingDialogProps {
  data: NonNullable<Dialogs['project_rating']>;
  close: () => void;
}

export default function ProjectRatingDialog({
  data,
  close,
}: ProjectRatingDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const mutation = useMutationUpdateProjectRating(data.project.id);
  // const {data:rating} = useFetchProjectRating(data.project.id);
  // console.log({rating})
  const addToast = useToastStore((s) => s.add);

  const onSubmit = async (formData: Inputs) => {
    // console.log({ formData });
    showLoading();
    try {
      await mutation.mutateAsync({
        projectId: data.project.id,
        mark: formData.rating.map((r) => r.rate),
      });
      addToast({
        type: 'success',
        title: 'Submitted',
      });
    } catch (err) {
      let resp = getErrorResp(err);

      addToast({
        type: 'error',
        title: 'Request not sent!',
        description: resp?.message ?? 'please try again later',
      });
    } finally {
      dismissLoading();
      close();
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: data.rating.map((r, index) => ({
        id: index.toString(),
        rate: r.rate,
        label: r.label,
      })),
    },
  });

  let watchedRating = watch('rating');
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'rating', // unique name for your Field Array
    },
  );
  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6">Rating</p>
      <p className="body-3 text-grey-500">{data.project.name}</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <Rate
                label={field.label}
                name={`rating.${index}.rate`}
                control={control}
                onValueChange={(v) => {
                  setValue(`rating.${index}.rate`, v);
                }}
                error={errors.rating?.[index]?.rate}
              />
            </div>
          );
        })}
        <p className="font-secondary text-[14px] text-white">
          Scores: {watchedRating.reduce((p, cur) => p + cur.rate, 0)}/
          {fields.length * 10}
        </p>
        <div className="mt-4 flex flex-row gap-4 justify-end">
          <button className="btn btn-secondary" type="button" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
