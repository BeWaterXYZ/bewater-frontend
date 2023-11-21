import { Input, Select, TextArea } from '@/components/form/control';

import { Dialogs, useDialogStore } from '../store';

import { useLoadingStoreAction } from '@/components/loading/store';
import { useToastStore } from '@/components/toast/store';
import { updateTeam } from '@/services/team';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAlert } from '@/components/alert/store';
import { OptionItem } from '@/constants/options/types';
import { ProjectTagSetOptions } from '@/constants/options/project-tag';
import { obtainProjectTagOptions } from '@/constants/options/project-tag';
import { RoleSetOptions } from '@/constants/options/role';
import { SkillSetOptions } from '@/constants/options/skill';
import { useNavigator } from '@/hooks/useNavigator';
import { validationSchema } from '@/schema';
import {
  useMutaionCreateTeam,
  useMutaionDismissTeam,
} from '@/services/team.query';
import { Team } from '@/services/types';
import { useState } from 'react';
import { COUNTRIES } from '@/constants/options/country';

const schema = z
  .object({
    name: validationSchema.text,
    title: validationSchema.text,
    description: validationSchema.text,
    role: validationSchema.role,
    tags: validationSchema.tags,
    roles: validationSchema.roles,
    skills: validationSchema.skills,
    nation: z.array(z.string()).length(1, 'please choose a country'),
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
      nation: team?.nation ? [team?.nation] : [],
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

  let hackProjectTagSetOptions: OptionItem<string>[] = ProjectTagSetOptions;
  if (data?.challenge?.track && data.challenge.track.length > 0) {
    hackProjectTagSetOptions = obtainProjectTagOptions(data.challenge.track);
  }
  if (isEditing && data.team?.challenge?.track && data.team.challenge.track.length > 0) {
    hackProjectTagSetOptions = obtainProjectTagOptions(data.team.challenge.track);
  }

  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const addToast = useToastStore((s) => s.add);
  const router = useNavigator('en');
  const createTeamMutaion = useMutaionCreateTeam();
  const dismissTeamMutation = useMutaionDismissTeam(data.team?.challengeId);
  const { confirm } = useAlert();
  const showDialog = useDialogStore((s) => s.open);
  const [isCallingAPI, setIsCallingAPI] = useState(false);

  const onDismiss = async () => {
    let confirmed = await confirm({
      title: 'Are you sure?',
      description: 'You are going to dismiss the team',
      okCopy: 'Dismiss',
      cancelCopy: 'Cancel',
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
        title: 'Team dismissed',
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
    setIsCallingAPI(true);
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
          nation: formData.nation[0],
        };
        let res = await updateTeam({ teamId: data.team?.id!, payload });
        addToast({
          type: 'success',
          title: 'Team info updated',
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
          nation: formData.nation[0],
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

          // addToast({
          //   type: 'success',
          //   title: 'team created',
          //   description: '',
          // });

          showDialog('team_created', {
            challenge: data.challenge!,
            teamId: res.team.id,
          });
        }
      }
      close();
    } catch (err) {
      console.log(err);
    } finally {
      dismissLoading();
      setIsCallingAPI(false);
    }
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useTeamCreateForm(data.team);
  return (
    <div className="w-[80vw] max-w-md max-h-[80vh] overflow-y-auto ">
      <p className="body-2 mb-4 ">{isEditing ? 'Edit Team' : 'Create A Team'}</p>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mr-4">
        <Input
          label="Team Name"
          placeholder="Enter your team name"
          required
          error={errors['name']}
          {...register('name')}
        />
        <Select
          label="Country"
          required
          maxSelections={1}
          options={COUNTRIES}
          error={errors['nation']}
          control={control}
          {...register('nation')}
        />

        <Input
          label="Project title"
          required
          placeholder="Enter your project title"
          error={errors['title']}
          {...register('title')}
        />
        <Select
          label="Project Tag"
          required
          maxSelections={5}
          options={hackProjectTagSetOptions}
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
            maxSelections={1}
            options={RoleSetOptions}
            error={errors['role']}
            control={control}
            {...register('role')}
          />
        )}

        <Select
          label="Roles Needed"
          maxSelections={4}
          options={RoleSetOptions}
          error={errors['roles']}
          control={control}
          {...register('roles')}
        />

        <Select
          label="Skill Needed"
          maxSelections={10}
          options={SkillSetOptions}
          error={errors['skills']}
          control={control}
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
          <div className="flex gap-2 ">
            <button
              disabled={isCallingAPI}
              className="btn btn-secondary "
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button className="btn btn-primary " disabled={isCallingAPI}>
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
