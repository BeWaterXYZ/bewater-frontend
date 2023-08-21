import { Select, TextArea } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { validationSchema } from '@/schema';
import { sendGroupingRequest } from '@/services/notification';
import { errorResponseScheme, getErrorResp } from '@/utils/error-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Dialogs } from '../store';

const schema = z
  .object({
    roles: validationSchema.role,
    message: validationSchema.text,
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useTeamJoinForm() {
  return useForm<Inputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      roles: [],
      message: '',
    },
  });
}

interface TeamJoinDialogProps {
  data: NonNullable<Dialogs['team_join']>;
  close: () => void;
}

export default function TeamJoinDialog({
  data: team,
  close,
}: TeamJoinDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);

  const leaders = team.teamMembers.filter((m) => m.isLeader);

  const onSubmit = async (formData: Inputs) => {
    showLoading();

    try {
      const data = await sendGroupingRequest(team.id, {
        type: 'APPLICATION',
        recipientId: leaders[0].userProfile.id,
        teamRole: formData.roles[0],
        message: formData.message,
      });
      if (data.newRequest) {
        addToast({
          type: 'success',
          title: 'Request sent!',
          description: 'please wait for team leader to approve',
        });
      } else {
        addToast({
          type: 'warning',
          title: 'Request not sent!',
          description: 'You are already in a team or you have pending request',
        });
      }
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
  } = useTeamJoinForm();

  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6">Request to Join The Team</p>

      <p className="body-3 text-grey-500 my-1 mt-6 font-bold">Team Name</p>
      <p className="body-3 my-1">{team.name}</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Select
          required
          maxSelections={1}
          label="You're going to play"
          options={RoleSetOptions}
          error={errors['roles']}
          control={control}
          {...register('roles')}
        />
        <TextArea
          label="Include a message"
          error={errors['message']}
          placeholder="write a request message..."
          {...register('message')}
        ></TextArea>

        <div className="mt-4 flex flex-row gap-4 justify-end">
          <button className="btn btn-secondary" type="button" onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary">Send request</button>
        </div>
      </form>
    </div>
  );
}
