import { segmentSchema } from "../../../segment-params";
import { Header } from "../header";
import { Sidebar } from "./sidebar";

export default function Layout({ children ,params }: { children: React.ReactNode ,params:any}) {
    const { challengeId } = segmentSchema.challengeId.parse(params);

  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-[84px,_1fr] gap-4">
      <Sidebar challengeId={challengeId}/>
      <div>{children}</div>
    </div>
  );
}
