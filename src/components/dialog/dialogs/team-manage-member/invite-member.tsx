import { Input, TextArea } from '@/components/form/control';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { sendGroupingRequest } from '@/services/grouping-request';
import { Team } from '@/services/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  user: z.string(),

  // users: z.array(z.string()).min(1, { message: '' }),
  message: z.string().min(3, 'At least 3 characters'),
});

export type Inputs = z.infer<typeof schema>;

export function useTeamCreateForm() {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: 'ef43dd28-d010-4937-be55-e14d4390095b',
      message: '',
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
      // Fix me
      const data = await sendGroupingRequest(team.id, {
        type: 'INVITATION',
        recipientId: formData.user,
        teamRole: 'Frontend Developer',
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
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              label=""
              error={errors['user']}
              placeholder="user id"
              {...register('user')}
            ></Input>
          </div>
          <button className="btn btn-secondary">Invite</button>
        </div>
        <div>
          <TextArea
            label=""
            error={errors['message']}
            placeholder="write a request message..."
            {...register('message')}
          ></TextArea>
        </div>
      </form>
    </div>
  );
}
