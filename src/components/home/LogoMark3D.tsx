"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useSyncExternalStore, type ReactNode } from "react";

const Scene = dynamic(() => import("./LogoMark3DScene"), { ssr: false, loading: () => <Poster /> });
function Poster() {
  return <Image src="/hero/mark-poster-warm.png" alt="" fill priority sizes="(max-width: 767px) 390px, 983px" className="object-contain" />;
}
class SceneBoundary extends Component<{ children: ReactNode; onReady: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onReady(); }
  render() { return this.state.failed ? <Poster /> : this.props.children; }
}
let webglCache: boolean | null = null;
function hasWebGL() {
  if (webglCache === null) {
    try {
      const gl = document.createElement("canvas").getContext("webgl2");
      webglCache = !!gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { webglCache = false; }
  }
  return webglCache;
}
const ignoreReady = () => {};
const neverChanges = () => () => {};
export function LogoMark3D({ onReady = ignoreReady, intro = false }: { onReady?: () => void; intro?: boolean }) {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(neverChanges, () => true, () => false);
  const enabled = hydrated && !reduce && hasWebGL();
  useEffect(() => { if (hydrated && !enabled) onReady(); }, [hydrated, enabled, onReady]);
  return <div className="relative h-full w-full" aria-hidden="true">
    <SceneBoundary onReady={onReady}>{enabled ? <Scene onReady={onReady} intro={intro} /> : <Poster />}</SceneBoundary>
  </div>;
}
