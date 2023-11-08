import {
  CreateOrganization,
  OrganizationList,
  OrganizationProfile,
  OrganizationSwitcher,
} from "@clerk/nextjs";

export default function () {
  return (
    <div>
      <div className="heading-1">Org</div>
      <div className="flex flex-wrap gap-4">
        <CreateOrganization />
        <OrganizationProfile />
        <OrganizationList />

        <OrganizationSwitcher />
      </div>
    </div>
  );
}
