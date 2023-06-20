import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "./query";
import { Dumpster } from "./dumpster";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: "variable",
});

// https://github.com/clerkinc/javascript/blob/main/packages/localizations/src/en-US.ts

const localization = {
  formFieldInputPlaceholder__emailAddress: 'Enter your email',
  signIn: {
    start: {
      title: 'Already have a host account?',
      subtitle: 'Sign in to manage your campaigns',
      actionText: '',
      actionLink: '',
    },
    emailCode: {
      title: 'Verify your email',
      subtitle: '',
      formTitle: '',
      formSubtitle: 'Enter the verification code sent to your email address',
      resendButton: 'Resend code',
    },
  },
  signUp: {
    start: {
      title: 'Create a host account',
      subtitle: 'Sign up to create your campaigns',
      actionText: 'Already have a host account?',
      actionLink: 'Sign in',
    },
    emailCode: {
      title: 'Verify your email',
      subtitle: '',
      formTitle: '',
      formSubtitle: 'Enter the verification code sent to your email address',
      resendButton: 'Resend code',
    },
  },
}

export const metadata = {
  title: "BeWater Host website",
  description: "BeWater Host website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
      <QueryProvider>
        <html lang="en">
          <body className={jetBrainsMono.className}>
           {children}
           <Dumpster />

          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
