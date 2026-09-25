"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Reveal the existing cases frame with a scroll-driven, curved liquid edge. */
export function useLiquidEntrance(section: RefObject<HTMLElement | null>, reduced: boolean | null) {
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = surface.current;
    const container = section.current;
    if (!panel || !container || reduced) return;
    let frame = 0;
    let current = -1;
    let previousTime = 0;
    let disposed = false;

    const render = (time: number) => {
      frame = 0;
      if (disposed) return;
      const top = container.getBoundingClientRect().top;
      const height = window.innerHeight;
      const width = panel.clientWidth;
      const target = Math.max(0, Math.min(1, (height - top) / height));
      const dt = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      if (current < 0 || target === 0 || top <= 0) current = target;
      else current += (target - current) * (1 - Math.exp(-dt / 85));
      const p = current * current * (3 - 2 * current);
      const edge = (1 - p) * height * .38;
      const swell = Math.sin(p * Math.PI) * height * .14;
      const crest = Math.max(0, edge * .14 - swell * .2);
      // Two unequal lobes flatten into the full rectangle before the first case advances.
      panel.style.clipPath = p >= .999 ? "none" : `path("M 0 ${edge} C ${width * .16} ${edge + swell} ${width * .24} ${crest} ${width * .48} ${crest} C ${width * .69} ${crest} ${width * .78} ${edge * .75 + swell} ${width} ${edge * .55} L ${width} ${height} L 0 ${height} Z")`;
      if (Math.abs(target - current) > .0005) frame = requestAnimationFrame(render);
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      panel.style.clipPath = "";
    };
  }, [section, reduced]);

  return surface;
}
