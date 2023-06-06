'use client';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { AspectRatioProps } from '@radix-ui/react-aspect-ratio';

export function Aspect(props: AspectRatioProps) {
  return (
    <AspectRatio.Root {...props} className="overflow-hidden"></AspectRatio.Root>
  );
}
