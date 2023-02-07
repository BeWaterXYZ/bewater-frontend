import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryBuilder() {
  const sp = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const usp = new URLSearchParams(sp.toString());

  const isOn = (key: string, value: string) => {
    let on = usp.get(key)?.split(',').includes(value);
    return !!on;
  };

  const toggle = (key: string, value: string) => {
    let vals = usp.get(key)?.split(',') ?? [];
    if (vals?.includes(value)) {
      usp.set(key, vals.filter((v) => v !== value).join(','));
    } else {
      usp.set(key, [...vals, value].join(','));
    }

    router.push(pathname + '?' + usp.toString());
  };
  const clear = () => {
    router.push(pathname!);
  };
  return {
    isOn,
    toggle,
    clear,
  };
}
