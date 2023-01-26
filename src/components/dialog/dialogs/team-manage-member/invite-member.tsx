import { Input, Select, TextArea } from '@/components/form/control';
import { UserSearch } from '@/components/form/control/user-search';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { sendGroupingRequest } from '@/services/grouping-request';
import { Team } from '@/services/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  user: z.string(),
  role: z
    .array(RoleSetScheme)
    .max(1, { message: 'You can only choose one role' }),
  message: z.string().min(3, 'At least 3 characters'),
});

export type Inputs = z.infer<typeof schema>;

export function useTeamCreateForm() {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: '',
      message: '',
      role: [],
    },
  });
}

interface InviteMemberProps {
  team: Team;
  close: () => void;
}
export function InviteMember({ team, close }: InviteMemberProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      const data = await sendGroupingRequest(team.id, {
        type: 'INVITATION',
        recipientId: formData.user,
        teamRole: formData.role[0],
        message: formData.message,
      });
      addToast({
        type: 'success',
        title: 'Invitation sent!',
        description: 'please wait for team member to accept',
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
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <UserSearch
          label="Name"
          required
          error={errors['user']}
          control={control}
          {...register('user')}
        />
        <Select
          label="You’ll invite him/her to play "
          required
          isMulti
          options={RoleSetOptions}
          error={errors['role']}
          control={control}
          {...register('role')}
        />
        <TextArea
          label="Include a message"
          error={errors['message']}
          placeholder="write a request message..."
          {...register('message')}
        ></TextArea>

        <div className="flex justify-end">
          <button className="btn btn-secondary">Invite</button>
        </div>
      </form>
    </div>
  );
}
