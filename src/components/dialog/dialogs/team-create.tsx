import { Input, Select, TextArea } from '@/components/form/control';

import { Dialogs } from '../store';

import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { updateTeam } from '@/services/team';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  ProjectTagSetOptions,
  ProjectTagSetScheme,
} from '@/constants/options/project-tag';
import { RoleSetOptions, RoleSetScheme } from '@/constants/options/role';
import { SkillSetOptions, SkillSetScheme } from '@/constants/options/skill';
import { useNavigator } from '@/hooks/useNavigator';
import {
  useMutaionCreateTeam,
  useMutaionDismissTeam,
} from '@/services/team.query';
import { Team } from '@/services/types';
import { useAlert } from '@/components/alert/store';

const schema = z
  .object({
    name: z.string().min(3, { message: 'At least 3 characters' }),
    title: z.string().min(3, { message: 'At least 3 characters' }),
    description: z.string(),
    role: z
      .array(RoleSetScheme)
      .max(1, { message: 'You can only choose one role' }),
    tags: z
      .array(ProjectTagSetScheme)
      .max(3, { message: 'You can only choose 3 skills' }),
    roles: z
      .array(RoleSetScheme)
      .min(1, { message: 'choose at least one role' })
      .max(5, { message: 'You can only choose 5 roles' }),
    skills: z
      .array(SkillSetScheme)
      .max(10, { message: 'You can only choose 10 skills' }),
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
      role: team ? ['Frontend Developer'] : [],
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
  const createTeamMutaion = useMutaionCreateTeam();
  const dismissTeamMutation = useMutaionDismissTeam();
  const { confirm } = useAlert();

  const onDismiss = async () => {
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to dismiss the team',
      okCopy: 'Dismiss',
      cancelCopy: 'cancel',
      type: 'warning',
    });
    if (!confirmed) return;
    showLoading();

    try {
      await dismissTeamMutation.mutateAsync(data.team!.id);
      router.gotoTeamList(data.team!.challengeId);
      close();
      addToast({
        type: 'success',
        title: 'team dismissed',
        description: '',
      });
    } catch (err) {
      console.log(err);
    } finally {
      dismissLoading();
    }
  };
  const onSubmit = async (formData: Inputs) => {
    showLoading();
    try {
      if (isEditing) {
        /**
         *  edit team
         */
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          openingRoles: formData.roles,
          skills: formData.skills,
        };
        let res = await updateTeam(data.team?.id!, payload);
        addToast({
          type: 'success',
          title: 'team updated',
          description: '',
        });
        router.refresh();
      } else {
        /**
         * create new team
         */
        let payload = {
          name: formData.name,
          projectName: formData.title,
          projectDescription: formData.description,
          projectTags: formData.tags,
          challengeId: data.challenge!.id,
          openingRoles: formData.roles,
          skills: formData.skills,
          leaderRole: formData.role[0],
        };

        let res = await createTeamMutaion.mutateAsync(payload);
        if (res.leaderAlreadyInChallenge) {
          addToast({
            type: 'error',
            title: 'Already in challenge',
            description: 'You already have a team',
          });
        } else if (res.team) {
          router.gotoTeam(data.challenge!.id, res.team.id);

          addToast({
            type: 'success',
            title: 'team created',
            description: '',
          });
        }
      }
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
          options={ProjectTagSetOptions}
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
            options={RoleSetOptions}
            error={errors['role']}
            control={control}
            {...register('role')}
          />
        )}

        <Select
          label="Roles Needed"
          options={RoleSetOptions}
          error={errors['roles']}
          control={control}
          isMulti
          {...register('roles')}
        />

        <Select
          label="Skill Needed"
          options={SkillSetOptions}
          error={errors['skills']}
          control={control}
          isMulti
          {...register('skills')}
        />
        <div className="flex justify-between">
          {isEditing ? (
            <button
              className="btn btn-danger "
              type="button"
              onClick={onDismiss}
            >
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
