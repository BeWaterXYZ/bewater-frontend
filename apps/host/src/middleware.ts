import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { languages } from "./i18n";

const path = "/lego";

function i18n(req: any) {
  let p = req.nextUrl.pathname;

  if (p.startsWith(path)) {
    if (!languages.some((lang) => p.startsWith(`${path}/${lang}`))) {
      return NextResponse.redirect(
        new URL(p.replace(path, `${path}/${languages[0]}`), req.url)
      );
    }
  }

  return NextResponse.next();
}

export default authMiddleware({
  isSatellite: true,
  domain: "host.bewater.xyz",
  beforeAuth: (req) => {
    return i18n(req);
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
