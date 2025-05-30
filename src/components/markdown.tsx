import M2J from "markdown-to-jsx";

type Props = React.ComponentProps<typeof M2J>;
export default function Markdown(props: Props) {
  return (
    <div className="font-secondary text-grey-400 prose prose-invert max-w-none">
      <M2J
        options={{
          overrides: {
            h1: {
              component: "h1",
              props: {
                className: "text-[32px] font-bold mb-6 text-white [text-shadow:0_0_6px_theme(colors.day)]",
              },
            },
            h2: {
              component: "h2",
              props: {
                className: "text-[24px] font-semibold mb-4 text-white [text-shadow:0_0_4px_theme(colors.day)]",
              },
            },
            h3: {
              component: "h3",
              props: {
                className: "text-[20px] font-medium mb-3 text-white",
              },
            },
            h4: {
              component: "h4",
              props: {
                className: "text-[18px] font-medium mb-2 text-white",
              },
            },
            h5: {
              component: "h5",
              props: {
                className: "text-[16px] font-medium mb-2 text-white",
              },
            },
            h6: {
              component: "h6",
              props: {
                className: "text-[14px] font-medium mb-2 text-white",
              },
            },
            ol: {
              component: "ol",
              props: {
                className: "space-y-3 my-4 list-none",
              },
            },
            ul: {
              component: "ul",
              props: {
                className: "space-y-3 my-4 list-none",
              },
            },
            li: {
              component: "li",
              props: {
                className: "text-[15px] leading-relaxed [&_p]:inline relative pl-6 before:absolute before:left-0 before:top-[0.4rem] before:w-2.5 before:h-2.5 before:rounded-full before:bg-gradient-to-r before:from-day before:to-[#00cccc] before:opacity-80 before:shadow-[0_0_6px_theme(colors.day)]",
              },
            },
            "ol li": {
              component: "li",
              props: {
                className: "text-[15px] leading-relaxed [&_p]:inline relative pl-6 before:absolute before:left-0 before:top-[0.4rem] before:w-2.5 before:h-2.5 before:rounded-full before:bg-gradient-to-r before:from-day before:to-[#00cccc] before:opacity-80 before:shadow-[0_0_6px_theme(colors.day)] before:content-[attr(data-index)] before:flex before:items-center before:justify-center before:text-[9px] before:font-bold before:text-night",
              },
            },
            p: {
              component: "p",
              props: {
                className: "text-[15px] leading-relaxed my-4 !break-keep !break-words",
              },
            },
            table: {
              component: "table",
              props: {
                className: "w-full border-collapse my-6",
              },
            },
            th: {
              component: "th",
              props: {
                className: "border border-white/20 p-3 text-left bg-white/5 font-medium",
              },
            },
            td: {
              component: "td",
              props: {
                className: "border border-white/20 p-3",
              },
            },
            a: {
              component: "a",
              props: {
                className: "text-day hover:text-[#00cccc] transition-colors duration-200 underline",
              },
            },
            code: {
              component: "code",
              props: {
                className: "bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-day",
              },
            },
            pre: {
              component: "pre",
              props: {
                className: "bg-white/10 p-4 rounded-lg my-4 overflow-x-auto border border-white/20",
              },
            },
            blockquote: {
              component: "blockquote",
              props: {
                className: "border-l-4 border-day pl-4 my-4 italic bg-white/5 p-4 rounded-r-lg",
              },
            },
            hr: {
              component: "hr",
              props: {
                className: "my-8 border-0 h-[1px] bg-gradient-to-r from-transparent via-day to-transparent",
              },
            },
            strong: {
              component: "strong",
              props: {
                className: "text-white font-semibold",
              },
            },
            em: {
              component: "em",
              props: {
                className: "text-white/80",
              },
            },
          },
        }}
        {...props}
      />
    </div>
  );
}
