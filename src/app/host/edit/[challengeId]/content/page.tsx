import { redirect } from "next/navigation";
import { segmentSchema } from "../../../segment-params";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  return redirect(`/host/edit/${challengeId}/content/hero`);
}
