"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
}

export default function SmoothScrolling({ children }: Props) {
  return (
    <ReactLenis root options={{ lerp: 0.3, duration: 0.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}
