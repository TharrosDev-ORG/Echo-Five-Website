"use client";

import Lottie from "lottie-react";
import animationData from "./lottie/echo-ripple.json";

type Props = {
  className?: string;
  size?: number;
};

export function EchoRipple({ className = "", size = 200 }: Props) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
