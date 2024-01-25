import { useOrganization, useUser } from "@clerk/nextjs";

export default function useRole() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { isLoaded: isOrganizationLoaded, organization } = useOrganization();
  return {
    isOrganization: !!organization,
    isLoaded: isLoaded && isOrganizationLoaded,
    isSignedIn,
    user,
    organization,
    roleId: organization?.id ?? user?.id,
  };
}
