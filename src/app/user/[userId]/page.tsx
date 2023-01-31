import { getUserProfileFull } from '@/services/user';
import { useFetchUser } from '@/services/user.query';
import { userSchema } from './param-schema';

export default async function page({ params }: any) {
  let { userId } = userSchema.parse(params);
  const profileFull = await getUserProfileFull(userId);
  return (
    <div className="container my-4 pt-20">
      <pre className="mono-4">{JSON.stringify(profileFull, null, 2)}</pre>
    </div>
  );
}
