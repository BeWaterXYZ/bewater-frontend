import { segmentSchema } from "../../segment-params";
import { Header } from "./header";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { challengeId } = segmentSchema.challengeId.parse(params);

  return (
    <div className="flex flex-col overflow-hidden">
      <Header challengeId={challengeId} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
