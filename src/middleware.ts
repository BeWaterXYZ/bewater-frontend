import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({publicRoutes:['/']});

export let config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};