import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryBuilder() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const maps: { [key: string]: string } = {};
  searchParams.forEach((v, key) => {
    maps[key] = v;
  });

  return {
    isOn(key: string, value: string) {
      return maps[key] === value;
    },
    toggle(key: string, value: string) {
      if (maps[key] === value) {
        delete maps[key];
      } else {
        maps[key] = value;
      }
      router.push(
        pathname +
          '?' +
          Object.keys(maps)
            .map((k) => `${k}=${maps[k]}`)
            .join('&'),
      );
    },
  };
}
