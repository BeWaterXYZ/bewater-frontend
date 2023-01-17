import { Select, TextArea } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { RoleOptions, Roles } from '@/components/tag';
import { useToastStore } from '@/components/toast/store';
import { sendTeamApplication } from '@/services/challenge';
import { useAuthStore } from '@/stores/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Dialogs } from '../store';

const schema = z
  .object({
    roles: z
      .array(z.string())
      .max(1, { message: 'You can only choose one role' }),
    message: z.string().min(3, 'At least 3 characters'),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useTeamCreateForm() {
  return useForm<Inputs>({
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
  const currentUser = useAuthStore((s) => s.user);

  const leaders = team.teamMembers.filter((m) => m.isLeader);

  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      const data = await sendTeamApplication(team.id, {
        type: 'APPLICATION',
        senderId: currentUser.userId!,
        recipientId: leaders[0].userId,
        teamRole: formData.roles.join(',') as Roles,
        message: formData.message,
      });
      console.log({ data });
      addToast({
        type: 'success',
        title: 'Request sent!',
        description: 'please wait for team leader to approve',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Request not sent!',
        description: 'please try again later',
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
  } = useTeamCreateForm();

  return (
    <div className="flex flex-col justify-center  ">
      <p className="heading-6">Request to Join The Team</p>

      <p className="body-3 text-grey my-1  mt-4 font-bold">Team Name</p>
      <p className="body-3 my-1">Dream team</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Select
          label="You're going to play"
          options={RoleOptions}
          error={errors['roles']}
          control={control}
          isMulti
          {...register('roles')}
        />

        <TextArea
          label="Include a message"
          error={errors['message']}
          placeholder="write a request message..."
          {...register('message')}
        ></TextArea>

        <div className="mt-4 flex flex-row gap-4">
          <button
            className="btn btn-secondary w-full"
            type="button"
            onClick={close}
          >
            Cancel
          </button>
          <button className="btn btn-primary w-full">Send request</button>
        </div>
      </form>
    </div>
  );
}
