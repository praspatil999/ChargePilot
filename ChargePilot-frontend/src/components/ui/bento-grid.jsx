import React from "react";
import clsx from "clsx";

export function BentoGrid({ className, children }) {
  return (
    <div
      className={clsx(
        "grid auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({ className, children }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl border bg-background p-1 transition-all hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
