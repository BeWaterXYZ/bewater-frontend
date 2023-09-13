import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from 'next/image';

export default function Page() {
  return (
    <div className="block ">
      <div className=" container my-8 pt-24 flex flex-1 justify-center">
        <SignIn
          afterSignUpUrl={"/onboarding"}
          appearance={{
            baseTheme: dark,
            variables: { colorPrimary: "#00ffff" },
            elements: {
              formButtonPrimary:
                "bg-day text-night hover:bg-[#00cccc] active:bg-[#009999] rounded-sm focus:shadow-none",
              card: "bg-night text-white p-0 gap-10",
              headerSubtitle: "text-gray-500",
              socialButtons: "",
              dividerRow: "",
              formFieldInput:
                "bg-night text-white border-gray-800 rounded-sm placeholder-gray-600",
              formFieldLabel: "text-gray-500 ",
              formFieldLabelRow: "mb-2",
              header: "text-xl gap-2",
              identityPreviewEditButton: "text-gray-500",
              formResendCodeLink:
                "text-day hover:text-[#00cccc] active:text-[#009999] rounded-none focus:shadow-none",
            },
          }}
        />
      </div>
      <Image
        height={204}
        width={468}
        src={'/assets/space.png'}
        className="block h-[300px]"
        alt=""
      />
    </div>
  );
}
