"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Sem a troca seca pôster → canvas (a "piscada" da abertura, 25/09): o pôster é
 * uma camada fixa que nunca desmonta, e o canvas fica por cima, invisível, até
 * desenhar o primeiro quadro; aí os dois trocam por opacidade. Antes, o pôster
 * era desmontado e remontado pelo `loading` do import dinâmico e sumia de vez
 * quando o canvas montava — que passava alguns quadros vazio.
 */
const Scene = dynamic(() => import("./LogoMark3DScene"), { ssr: false });
function Poster() {
  return <Image src="/hero/mark-poster.png" alt="" fill priority sizes="(max-width: 767px) 390px, 983px" className="object-contain" />;
}
class SceneBoundary extends Component<{ children: ReactNode; onReady: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onReady(); }
  // Se o 3D falhar, o pôster de baixo continua aparecendo.
  render() { return this.state.failed ? null : this.props.children; }
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
  const [live, setLive] = useState(false);
  useEffect(() => { if (hydrated && !enabled) onReady(); }, [hydrated, enabled, onReady]);
  // O primeiro `useFrame` roda antes do primeiro desenho: espera o quadro seguinte.
  const handleReady = useCallback(() => {
    requestAnimationFrame(() => setLive(true));
    onReady();
  }, [onReady]);
  const fade = "absolute inset-0 transition-opacity duration-700 ease-out";
  return <div className="relative h-full w-full" aria-hidden="true">
    <div className={fade} style={{ opacity: live ? 0 : 1 }}><Poster /></div>
    {enabled && <div className={fade} style={{ opacity: live ? 1 : 0 }}>
      <SceneBoundary onReady={onReady}><Scene onReady={handleReady} intro={intro} /></SceneBoundary>
    </div>}
  </div>;
}
