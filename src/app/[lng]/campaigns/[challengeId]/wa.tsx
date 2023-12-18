'use client';
import Cookies from "js-cookie"
import { pvCounter } from "@/utils/global";
import { generate } from 'randomstring';
import { postPvData } from "@/services/wa";

// todo 优化：单独处理登录之后
export default function WA({ challengeId }: { challengeId: string }) {
  if (pvCounter.startView > 0) {
    return null;
  }

  pvCounter.startView += 1;

  const key = 'bewat_statist_u_2312';
  let value = Cookies.get(key);
  if (!value) {
    value = `${Date.now()}-${generate(12)}`
  }
  Cookies.set(key, value, { expires: 365 });
  postPvData(value, challengeId).then((res) => {
  });
  return null;
}
