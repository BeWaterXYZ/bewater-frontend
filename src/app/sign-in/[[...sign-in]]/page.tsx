import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className=" container my-4 pt-20 flex flex-1 justify-center">
      <SignIn afterSignUpUrl={'/onboarding'}  />
    </div>
  );
}