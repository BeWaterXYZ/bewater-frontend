import { useLoadingStoreAction } from "@/components/loading/store";
import { publishChallengeRequest } from "@/services/challenge";
import { ChallengeID } from "@/services/types";
import { CheckIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function PublishButton({ challengeId }: { challengeId: ChallengeID }) {
  let { showLoading, dismissLoading } = useLoadingStoreAction();
  let [publishRequested, publishRequestedSet] = useState(false);

  let publish = () => {
    try {
      showLoading();
      publishChallengeRequest(challengeId);
      publishRequestedSet(true);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };

  return (
    <>
      {publishRequested ? (
        <div className="z-[100] fixed top-0  bottom-0 left-0 right-0 flex flex-col gap-2 justify-center items-center bg-night">
          <div className="h-12 w-12 m-8 relative bg-[#10B981] flex items-center justify-center rounded-full">
            <CheckIcon className="w-8 h-8 text-night" />
          </div>
          <p className="text-xl leading-8 text-white">
            Publish Request Submitted!
          </p>
          <p className="text-[14px] text-grey-500 mb-4">
            You’ll get notification after review. Review usually takes 1-2
            business days.
          </p>
          <div className="flex gap-2">
            <a
              href={`${window.location.origin}/host/edit/${challengeId}`}
              className="btn btn-secondary min-w-[96px]"
            >
              Done
            </a>{" "}
            <a
              href={`https://build.bewater.xyz/en/campaigns/${challengeId}`}
              className="btn btn-secondary-invert gap-2"
            >
              <OpenInNewWindowIcon />
              Open campaign page
            </a>
          </div>
        </div>
      ) : null}
      <button className="btn btn-primary" onClick={publish}>
        Publish Request
      </button>
    </>
  );
}
