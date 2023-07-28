import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <SignUp 
      appearance={{
        baseTheme: dark,
        variables: {colorPrimary: '#00ffff'},
        elements: {
          formButtonPrimary:
          'bg-day text-night hover:bg-[#00cccc] active:bg-[#009999] rounded-sm focus:shadow-none',
        card: 'bg-night text-white p-0 gap-10',
        headerSubtitle: 'text-gray-500',
        socialButtons: 'hidden',
        dividerRow: 'hidden',
        formFieldInput:
          'bg-night text-white border-gray-800 rounded-sm placeholder-gray-600',
        formFieldLabel: 'text-gray-500 ',
        formFieldLabelRow: 'mb-2',
        // footer: 'hidden',
        header: 'text-xl gap-2',
        identityPreviewEditButton: 'text-gray-500',
        formHeaderSubtitle:"text-gray-500",
        formResendCodeLink:
          'text-day hover:text-[#00cccc] active:text-[#009999] rounded-none focus:shadow-none',
          footerActionLink: 'focus:shadow-none'
        },
      }}/>
    </div>
  );
}
