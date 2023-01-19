import { Input, Select, TextArea } from '@/components/form/control';
import {
  RoleOptions,
  SkillOptions,
  ProjectTagOptions,
} from '@/components/tag/data';

import { Dialogs } from '../store';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToastStore } from '@/components/toast/store';
import { useLoadingStoreAction } from '@/components/loading/store';
import {
  createTeam,
  CreateTeamRequest,
  Team,
  updateTeam,
  UpdateTeamRequest,
} from '@/services/challenge';

import { useNavigator } from '@/hooks/useNavigator';

const schema = z
  .object({
    name: z.string().min(3, { message: 'At least 3 characters' }),
    title: z.string().min(3, { message: 'At least 3 characters' }),
    description: z.string(),
    role: z
      .array(z.string())
      .max(1, { message: 'You can only choose one role' }),
    tags: z
      .array(z.string())
      .max(3, { message: 'You can only choose 3 skills' }),
    roles: z
      .array(z.string())
      .min(1, { message: 'choose at least one role' })
      .max(5, { message: 'You can only choose 5 roles' }),
    skills: z
      .array(z.string())
      .max(5, { message: 'You can only choose 5 skills' }),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useTeamCreateForm(team?: Team) {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: team?.name ?? '',
      title: team?.project.name ?? '',
      description: team?.project.description ?? '',
      role: team ? ['whatever'] : [],
      tags: team?.project.tags ?? [],
      roles: team?.openingRoles ?? [],
      skills: team?.skills ?? [],
    },
  });
}

interface TeamCreateDialogProps {
  data: NonNullable<Dialogs['team_create']>;
  close: () => void;
}

export default function TeamCreateDialog({
  data,
  close,
}: TeamCreateDialogProps) {
  const isEditing = !!data.team;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const router = useNavigator();
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      if (isEditing) {
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          openingRoles: formData.roles,
          skills: formData.skills,
        } as UpdateTeamRequest;
        let res = await updateTeam(data.team?.id!, payload);
        addToast({
          type: 'success',
          title: 'team updated',
          description: '',
        });
      } else {
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          challengeId: data.challenge!.id,
          openingRoles: formData.roles,
          skills: formData.skills,
          leaderRole: formData.role[0],
        } as CreateTeamRequest;

        let res = await createTeam(payload);

        console.log(payload);

        addToast({
          type: 'success',
          title: 'team created',
          description: '',
        });
      }
      router.refresh();
      close();
    } catch (err) {
      console.log(err);
    } finally {
      dismissLoading();
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useTeamCreateForm(data.team);
  return (
    <div className="flex flex-col justify-center  w-[80vw]  max-w-md ">
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
        <Select
          label="Project Tag"
          required
          isMulti
          options={ProjectTagOptions}
          error={errors['tags']}
          control={control}
          {...register('tags')}
        />
        <TextArea
          label="Project Description"
          placeholder="Enter your project description"
          error={errors['description']}
          {...register('description')}
        />
        {isEditing ? null : (
          <Select
            label="You’re going to play"
            required
            isMulti
            options={RoleOptions}
            error={errors['role']}
            control={control}
            {...register('role')}
          />
        )}

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
        <div className="flex justify-between">
          {isEditing ? (
            <button className="btn btn-danger " type="button" onClick={close}>
              Dismiss
            </button>
          ) : null}
          <div className="flex-1" />
          <div className="flex gap-2">
            <button
              className="btn btn-secondary "
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button className="btn btn-primary ">
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
