'use client';
import Cookies from "js-cookie"
import { pvCounter } from "@/utils/global";
import { generate } from 'randomstring';
import { postPvData } from "@/services/wa";

export default function WA({ challengeId }: { challengeId: string }) {
  if (pvCounter.startView[challengeId]) {
    return null;
  }

  pvCounter.startView[challengeId] = true;

  const key = `_bw_stic_u_${challengeId}`;
  let value = Cookies.get(key);
  if (!value) {
    const timestamp = Date.now();
    value = `${timestamp}-${generate(5)}`
    // todo 永久保存
    Cookies.set(key, value, { expires: 365 });
  }
  const arr = value.split("-");
  value = arr[0] + '-' + arr[0] + arr[1];
  postPvData(value, challengeId).then((res) => {
  });
  return null;
}
