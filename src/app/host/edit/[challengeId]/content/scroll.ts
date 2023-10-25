export function scrollTo(segment: string) {
  console.log("scroll to", segment);
  let f = document.getElementById("preview") as HTMLIFrameElement | null;
  let ele = f?.contentDocument?.getElementById(segment);

  let y =
    ele?.offsetTop! -
    window.innerHeight / 2 +
    ele?.getBoundingClientRect().height! / 2;
  f?.contentWindow!.scrollTo({ top: y, behavior: "smooth" });
}
