import { segmentSchema } from "../../segment-params";
import { Header } from "./header";

export default function Layout({ children ,params }: { children: React.ReactNode ,params:any}) {
    const { challengeId } = segmentSchema.challengeId.parse(params);

  return (
    <div className="min-h-[calc(100vh-80px)] ">
      <Header challengeId={challengeId}/>
      <div>{children}</div>
    </div>
  );
}
