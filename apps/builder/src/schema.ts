import { z } from 'zod';
import { ProjectTagSetScheme } from './constants/options/project-tag';
import { RoleSetScheme } from './constants/options/role';
import { SkillSetScheme } from './constants/options/skill';
import { checkUsername } from './services/user';

export const validationSchema = {
  email: z.string().email(),
  verificationCode: z.string().min(6, { message: '6 digits code' }),
  userName: (currentUserName: string) =>
    z
      .string()
      .regex(/^[A-Za-z0-9)_]*$/, {
        message: 'only support alphanumeric and underscore',
      })
      .min(3, { message: 'At least 3 characters' })
      .refine(checkUsername(currentUserName), {
        message: 'The user name is taken',
      }),
  fullName: z.string().min(3, { message: 'At least 3 characters' }),
  // general text field
  text: z.string().min(3, { message: 'At least 3 characters' }),
  userId: z.string().min(1, { message: 'Please choose one user' }),
  bio: z.string().optional(),
  roles: z
    .array(RoleSetScheme)
    .max(5, { message: 'You can only choose 5 roles' }),
  role: z
    .array(RoleSetScheme)
    .min(1, { message: 'You need to choose one role' })
    .max(1, { message: 'You can only choose one role' }),
  skills: z
    .array(SkillSetScheme)
    .max(10, { message: 'You can only choose 10 skills' }),
  tags: z
    .array(ProjectTagSetScheme)
    .min(1, { message: 'You need to choose one tag' })
    .max(1, { message: 'You can only choose one tag' }),
};