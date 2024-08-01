import { Nav } from "./nav";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng = "en" } = params || {};
  return (
    <div>
      <div className="sticky top-[135px] lg:top-[72px]">
        <Nav lng={lng} />
      </div>
      <div>{children}</div>
    </div>
  );
}
