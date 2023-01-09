import { Avatar } from '@/components/avatar';
import { Select, TextArea } from '@/components/form/control';
import { RoleOptions, TagSkill } from '@/components/tag';
import { TagRole } from '@/components/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Dialogs } from '../store';

const schema = z
  .object({
    roles: z.array(z.string()),
    message: z.string(),
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
  data: Dialogs['team_join'];
  close?: () => void;
}

export default function TeamJoinDialog({ data, close }: TeamJoinDialogProps) {
  const onSubmit = (data: Inputs) => {
    console.log({ data });
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useTeamCreateForm();

  return (
    <div className="flex flex-col justify-center  ">
      <p className="body-4 text-grey my-1">{"Now You're Requesting to Join"}</p>
      <p className="heading-6">Yet another layer 2 idea</p>

      <p className="body-4 text-grey my-1 mt-3">Team Leader</p>
      <Avatar size="small" />

      <p className="body-4 text-grey my-1 mt-3">Description</p>
      <p className="body-4">Let’s make a terrific Layer 2 product!</p>

      <p className="body-4 text-grey my-1 mt-3">The team needs...</p>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="body-5 text-grey">Roles</p>
          <div>
            <TagRole label="fe" />
            <TagRole label="be" />
            <TagRole label="fe" />
          </div>
        </div>
        <div className="w-1/2">
          <p className="body-5 text-grey">Skills</p>
          <div className="">
            <TagSkill label="react" />
            <TagSkill label="react" />
            <TagSkill label="react" />
          </div>
        </div>
      </div>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
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
          {...register('message')}
          placeholder="write a request message..."
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
