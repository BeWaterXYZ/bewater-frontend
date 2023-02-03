import { Select, TextArea } from '@/components/form/control';
import { UserSearch } from '@/components/form/control/user-search';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { RoleSetOptions } from '@/constants/options/role';
import { validationSchema } from '@/schema';
import { sendGroupingRequest } from '@/services/grouping-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialogs, useDialogStore } from '../../store';

const schema = z.object({
  user: z.string(),
  role: validationSchema.role,
  message: validationSchema.text,
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

interface InviteMemberDialogProps {
  data: NonNullable<Dialogs['team_invite_member']>;
  close: () => void;
}
export default function InviteMemberDialog({
  data,
  close,
}: InviteMemberDialogProps) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  let showDialog = useDialogStore((s) => s.open);

  const addToast = useToastStore((s) => s.add);
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      await sendGroupingRequest(data.id, {
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
      console.log(err);
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

  const gotoManangeMember = () => {
    showDialog('team_manage_member', data);
    close();
  };
  return (
    <div className="flex flex-col justify-center  w-[80vw]  max-w-md ">
      <div>
        <button className="heading-6" onClick={gotoManangeMember}>
          <ArrowLeftIcon className="inline" width={20} height={20} /> Invite a
          new member
        </button>
      </div>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <UserSearch
          label="Name"
          required
          exclude={data.teamMembers.map((tm) => tm.userId)}
          error={errors['user']}
          control={control}
          {...register('user')}
        />
        <Select
          label="You’ll invite him/her to play "
          required
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
