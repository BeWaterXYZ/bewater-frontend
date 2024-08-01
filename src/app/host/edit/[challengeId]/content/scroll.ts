import { useEffect } from "react";

// export function scrollTo(segment: string) {
//   console.log("scroll to", segment);
//   let f = document.getElementById("frame") as HTMLIFrameElement | null;
//   let ele = document.getElementById(segment);

//   let y =
//     ele?.offsetTop! -
//     window.innerHeight / 2 +
//     ele?.getBoundingClientRect().height! / 2;
//   f!.scrollTo({ top: y, behavior: "smooth" });
// }

export function useScrollTo(segment: string) {
  useEffect(() => {
    setTimeout(() => {
      const f = document.getElementById("frame") as HTMLIFrameElement | null;
      const ele = document.getElementById("section-" + segment);

      const y = ele?.offsetTop! - 168;

      if (f) {
        f.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
