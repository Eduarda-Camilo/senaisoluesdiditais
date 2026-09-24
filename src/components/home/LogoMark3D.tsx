"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSyncExternalStore } from "react";

/**
 * Invólucro do símbolo 3D do Hero.
 *
 * Degradação em três níveis (docs/DIRECAO-V2.md §5.6): com prefers-reduced-motion,
 * sem WebGL ou se o import dinâmico falhar, fica o SVG estático — que é também o
 * que aparece enquanto a cena carrega. O site nunca depende do 3D para existir.
 */

const Scene = dynamic(() => import("./LogoMark3DScene"), {
  ssr: false,
  loading: () => <Poster />,
});

function Poster() {
  return (
    <Image
      src="/brand/sd-simbolo-branco.svg"
      alt=""
      aria-hidden="true"
      width={122}
      height={145}
      priority
      className="absolute inset-0 m-auto w-[45%] max-w-[16rem] h-auto opacity-90"
    />
  );
}

let webglCache: boolean | null = null;
function hasWebGL() {
  if (webglCache === null) {
    try {
      const canvas = document.createElement("canvas");
      webglCache = Boolean(window.WebGLRenderingContext && canvas.getContext("webgl2"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

// `false` no servidor e durante a hidratação, `true` depois — sem setState em effect.
// Mantém o poster no HTML inicial, fora do caminho do LCP.
const neverChanges = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

export function LogoMark3D() {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const enabled = hydrated && !reduce && hasWebGL();

  return (
    <div className="relative aspect-square w-full max-w-[34rem] mx-auto">
      {enabled ? <Scene /> : <Poster />}
    </div>
  );
}
