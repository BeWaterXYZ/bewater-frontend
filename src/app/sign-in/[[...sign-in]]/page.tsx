import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="container pt-20 flex flex-1 justify-center items-center min-h-[calc(100vh-80px)]">
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
            formFieldLabel: "text-gray-500",
            formFieldLabelRow: "mb-2",
            header: "text-xl gap-2",
            identityPreviewEditButton: "text-gray-500",
            formResendCodeLink:
              "text-day hover:text-[#00cccc] active:text-[#009999] rounded-none focus:shadow-none",
            providerIcon__okx_wallet: "[background:radial-gradient(circle,_#fff_50%,_#000_50%)] scale-[1.5]",
          },
        }}
      />
    </div>
  );
}
