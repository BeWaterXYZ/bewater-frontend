import React, { useState } from "react";
import * as RHoverCard from "@radix-ui/react-hover-card";

interface HoverCardProps {
  children: React.ReactNode;
  card: React.ReactNode;
  side?: "left" | "right" | "bottom" | "top";
}

export function HoverCard({ children, card, side }: HoverCardProps) {
  let [open, openSet] = useState(false);
  return (
    <RHoverCard.Root
      open={open}
      defaultOpen={false}
      onOpenChange={(v) => {
        console.log("trigger", v);
        openSet(v);
      }}
    >
      <RHoverCard.Trigger
        asChild
        onClick={() => {
          openSet(!open);
        }}
      >
        {children}
      </RHoverCard.Trigger>
      <RHoverCard.Portal>
        {open ? (
          <RHoverCard.Content
            className="p-2 rounded bg-[#0F1021]"
            sideOffset={5}
            side={side}
          >
            {card}
            <RHoverCard.Arrow className="fill-[#0F1021]" />
          </RHoverCard.Content>
        ) : null}
      </RHoverCard.Portal>
    </RHoverCard.Root>
  );
}

export default HoverCard;
