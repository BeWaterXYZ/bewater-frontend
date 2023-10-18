import { z } from 'zod';
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
  zhName: z.string().min(2, { message: 'At least 2 characters' }),
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
    .string().array()
    .min(1, { message: 'You need to choose one tag' }),
  date: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/, { message: "Please pick a date" }),
  image: z.string().url("please upload image"),
  positive: z.string().regex(/^[1-9][0-9]*$/, "wrong number"),
  nonNegative: z.string().regex(/^[1-9][0-9]*|0$/, "invalid number"),
};
