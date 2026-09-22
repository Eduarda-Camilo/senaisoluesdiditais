"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Anima um número como "+230 mil" ou "95,9%" preservando prefixo/sufixo.
 * Com prefers-reduced-motion ou sem JS, o valor final está no HTML desde o início.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "100000px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const decimalsComma = num.includes(",") ? num.split(",")[1].length : 0;
    const target = parseFloat(num.replace(/\./g, "").replace(",", "."));
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const formatted = decimalsComma
          ? v.toFixed(decimalsComma).replace(".", ",")
          : Math.round(v).toLocaleString("pt-BR");
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
