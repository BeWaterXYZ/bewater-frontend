import { Avatar } from '@/components/avatar';
import { Input, Select, TextArea } from '@/components/form/control';
import { RoleOptions, SkillOptions } from '@/components/tag/data';

import { Dialogs } from '../store';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(3, { message: 'At least 3 characters' }),
    title: z.string().min(3, { message: 'At least 3 characters' }),
    description: z.string(),
    roles: z.array(z.string()),
    skills: z.array(z.string()),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useOnboardingForm() {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      roles: [],
      skills: [],
    },
  });
}

interface TeamJoinDialogProps {
  data: Dialogs['team_join'];
}

export default function TeamJoinDialog(props: TeamJoinDialogProps) {
  const onSubmit = (data: Inputs) => {
    console.log({ data });
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useOnboardingForm();
  return (
    <div className="flex flex-col justify-center  ">
      <p className="body-2 mb-4">Create A Team</p>

      <form method="post" onSubmit={handleSubmit(onSubmit)} className="">
        <Input
          label="Team Name"
          placeholder="Enter your team name"
          required
          error={errors['name']}
          {...register('name')}
        />
        <Input
          label="Project title"
          required
          placeholder="Enter your full name"
          error={errors['title']}
          {...register('title')}
        />
        <TextArea
          label="Project Description"
          placeholder="Enter your project description"
          error={errors['description']}
          {...register('description')}
        />
        <Select
          label="Roles Needed"
          options={RoleOptions}
          error={errors['roles']}
          control={control}
          isMulti
          {...register('roles')}
        />

        <Select
          label="Skill Needed"
          options={SkillOptions}
          error={errors['skills']}
          control={control}
          isMulti
          {...register('skills')}
        />
        <div className="flex gap-2">
          <button className="btn btn-secondary w-full">Cancel</button>
          <button className="btn btn-primary w-full">Create</button>
        </div>
      </form>
    </div>
  );
}
