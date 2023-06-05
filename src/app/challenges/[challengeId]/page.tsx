import { segmentSchema } from "@/app/segment-params";
import { TestEdit } from "./edit/test";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  return (
    <div className="container my-4 pt-20 flex flex-1 ">
      challenge
      <TestEdit />
    </div>
  );
}
