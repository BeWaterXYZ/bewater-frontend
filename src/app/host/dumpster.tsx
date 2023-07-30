"use client";
import { LoadingContainer } from "@/components/loading";
import { useLoadingStore } from "@/components/loading/store";
import { ToastContainer } from "@/components/toast";
import { useToastStore } from "@/components/toast/store";
import { isBrowser } from "@/constants";
import { attach } from "@/fetch-intercept";

// hack for clerk bug
if (isBrowser) {
  const fetchIntercept = attach(window);
  fetchIntercept.register({
    response: function (response: Response) {
      if (
        response.url.includes('/v1/client') ||
        response.url.includes('/v1/me')
      ) {
        const json = () =>
          response
            .clone()
            .json()
            .then((data) => {
              try {
                data.response.sessions[0].user.web3_wallets[0].verification.strategy =
                  'web3_metamask_signature';
              } catch (err) {}
              try {
                data.client.sessions[0].user.web3_wallets[0].verification.strategy =
                  'web3_metamask_signature';
              } catch (err) {}
              try {
                data.response.user.web3_wallets[0].verification.strategy =
                  'web3_metamask_signature';
              } catch (err) {}

              return data;
            });

        response.json = json;
        return response;
      }

      return response;
    },
  });
}


export function Dumpster() {
  const toasts = useToastStore((s) => s.toasts);
  const loading = useLoadingStore((s) => s.loading);

  return (
    <>
      <ToastContainer toasts={toasts} />
      <LoadingContainer loading={loading} />
    </>
  );
}
