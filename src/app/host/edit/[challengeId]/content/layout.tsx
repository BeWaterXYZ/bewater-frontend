import { segmentSchema } from "../../../segment-params";
import { Frame } from "./frame";
import { Sidebar } from "./sidebar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);

  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-[84px,512px,_1fr] gap-4">
      <Sidebar challengeId={challengeId} />
      <div className="border-r border-r-white/20">{children}</div>
      <Frame challengeId={challengeId} />
    </div>
  );
}
