import M2J from "markdown-to-jsx";

type Props = React.ComponentProps<typeof M2J>;
export default function Markdown(props: Props) {
  return (
    <M2J
      options={{
        overrides: {
          h1: {
            component: "h1",
            props: {
              className: "text-[32px]",
            },
          },
          h2: {
            component: "h2",
            props: {
              className: "text-[24px]",
            },
          },
          h3: {
            component: "h3",
            props: {
              className: "text-[18px]",
            },
          },
          h4: {
            component: "h4",
            props: {
              className: "text-[14px]",
            },
          },
          h5: {
            component: "h5",
            props: {
              className: "text-[12px]",
            },
          },
          h6: {
            component: "h6",
            props: {
              className: "text-[10px]",
            },
          },
          th: {
            component: "th",
            props: {
              className: "border border-white/50 p-2 text-left",
            },
          },
          td: {
            component: "td",
            props: {
              className: "border border-white/50 p-2  ",
            },
          },
        },
      }}
      {...props}
    />
  );
}
