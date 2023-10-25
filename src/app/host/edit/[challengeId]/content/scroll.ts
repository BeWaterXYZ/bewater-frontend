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
      let f = document.getElementById("frame") as HTMLIFrameElement | null;
      let ele = document.getElementById("section-" + segment);

      let y =
        ele?.offsetTop! -
        window.innerHeight / 2 +
        ele?.getBoundingClientRect().height! / 2;
      f!.scrollTo({ top: y, behavior: "smooth" });
    }, 1000);
  }, []);
}
