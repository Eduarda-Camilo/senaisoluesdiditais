"use client";

import { useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * Globo que atravessa Serviços → Sobre nós → Trabalhe conosco (pedidos de 24/09).
 *
 * Um único globo 3D numa camada `fixed`, atrás do conteúdo das três seções.
 * A posição dele sai de dois marcadores no DOM, lidos a cada quadro:
 *
 * - `GlobeAnchor` (em Serviços): à direita, sangrando pela borda. O globo entra
 *   colado nele e, quando chega à altura de pouso, fica parado na tela enquanto
 *   a lista de serviços rola.
 * - `GlobeSlot` (em Sobre nós, no lugar da foto): quando essa seção entra, o
 *   globo desliza para a esquerda, na mesma altura, e pousa no slot exatamente
 *   quando ele chega lá. Daí em diante vai colado ao slot e prende junto com o
 *   quadro do Sobre.
 * - `GlobeEnd` (fim da faixa preta do Trabalhe conosco): quando o Sobre solta,
 *   o globo espera na mesma altura, depois desce para a direita crescendo e
 *   pousa como a cúpula atrás do "Vem ser FIESC", cortada pela faixa branca.
 *
 * A altura de pouso é onde o slot fica quando o quadro do Sobre prende
 * (`data-globe-frame`, o mesmo `top` que About.tsx calcula), então não há
 * salto vertical. A camada fica atrás do conteúdo e é recortada pela caixa das
 * três seções: não aparece na cena de cases nem no Entre em contato. Por isso o
 * Sobre e a faixa preta do Trabalhe conosco não têm fundo próprio.
 *
 * O scroll também gira o globo em volta do eixo. Posição e giro são
 * amortecidos, então o movimento é contínuo mesmo com a roda do mouse em degraus.
 *
 * Abaixo de `lg`, com prefers-reduced-motion ou sem WebGL, não há travessia: o
 * slot mostra o SVG parado, e Serviços fica sem globo.
 */

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => <Poster /> });

type Register = (el: HTMLElement | null) => void;
type Ctx = { anchor: Register; slot: Register; end: Register; travel: boolean };
const GlobeCtx = createContext<Ctx | null>(null);

function Poster({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- SVG vetorial decorativo; next/image não otimiza SVG.
  return <img src="/home/globo.svg" alt="" aria-hidden="true" className={cn("absolute inset-0 size-full", className)} />;
}

const neverChanges = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

function subscribeLg(cb: () => void) {
  const mq = window.matchMedia("(min-width: 64rem)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const useLg = () =>
  useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia("(min-width: 64rem)").matches,
    () => false,
  );

let webglCache: boolean | null = null;
function hasWebGL() {
  if (webglCache === null) {
    try {
      webglCache = Boolean(window.WebGLRenderingContext && document.createElement("canvas").getContext("webgl2"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const smoothstep = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};

export function GlobeTrack({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  const lg = useLg();
  const travel = hydrated && lg && !reduce;
  const webgl = hydrated && hasWebGL();

  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const slotRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLElement | null>(null);
  const spin = useRef(0);
  const [onScreen, setOnScreen] = useState(false);

  const anchor = useCallback((el: HTMLElement | null) => {
    anchorRef.current = el;
  }, []);
  const slot = useCallback((el: HTMLElement | null) => {
    slotRef.current = el;
  }, []);
  const end = useCallback((el: HTMLElement | null) => {
    endRef.current = el;
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !travel) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(wrap);
    return () => io.disconnect();
  }, [travel]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    const a = anchorRef.current;
    const b = slotRef.current;
    const c = endRef.current;
    if (!travel || !onScreen || !wrap || !layer || !a || !b || !c) return;
    const frame = b.closest<HTMLElement>("[data-globe-frame]");
    const band = c.closest<HTMLElement>("[data-globe-band]");

    let raf = 0;
    let last = performance.now();
    let x: number | null = null;
    let y = 0;
    let w = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const vh = window.innerHeight;
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();

      // 1) Serviços → Sobre. Pouso = onde o slot fica com o quadro do Sobre preso
      // (ver About.tsx); o globo espera nessa altura e desliza na horizontal.
      let land = br.top;
      if (frame) {
        const fr = frame.getBoundingClientRect();
        land = Math.min(0, vh - frame.offsetHeight) + (br.top - fr.top);
      }
      const t1 = smoothstep((vh - br.top) / Math.max(vh - land, 1));

      // 2) Sobre → Trabalhe conosco. Pouso = o fim da faixa preta encostado na base
      // da tela (o globo aparece só como a cúpula atrás do "Vem ser FIESC"). O
      // trajeto dura ~0,8 de tela de scroll: o globo sai da altura em que esperava
      // e desce até a cúpula enquanto vai para a direita e cresce.
      const land2 = band ? vh - (band.getBoundingClientRect().bottom - cr.top) : vh - cr.height * 0.2;
      const start2 = land2 + vh * 0.8;
      const t2 = smoothstep((start2 - cr.top) / Math.max(start2 - land2, 1));

      let tx: number;
      let ty: number;
      let size: number;
      if (t1 < 1) {
        tx = ar.left + (br.left - ar.left) * t1;
        ty = Math.max(ar.top, land);
        size = br.width;
      } else {
        const hold = Math.max(br.top, land);
        tx = br.left + (cr.left - br.left) * t2;
        // Mira a altura de pouso, não o marcador (que ainda sobe de baixo da tela):
        // assim o globo desce direto, sem passar do ponto e voltar.
        ty = t2 < 1 ? hold + (land2 - hold) * t2 : cr.top;
        size = br.width + (cr.width - br.width) * t2;
      }

      if (x === null) {
        x = tx;
        y = ty;
      } else {
        const k = 1 - Math.exp(-dt * 14);
        x += (tx - x) * k;
        y += (ty - y) * k;
      }

      spin.current = window.scrollY * 0.0015;

      w += (size - w) * (w ? 1 - Math.exp(-dt * 14) : 1);
      layer.style.width = `${w}px`;
      layer.style.height = `${w}px`;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // Recorta na caixa das três seções (a faixa branca do Trabalhe conosco já
      // cobre o globo por ter fundo; o recorte cuida do que vem depois).
      const clipTop = Math.max(0, wr.top - y);
      const clipBottom = Math.max(0, y + w - wr.bottom);
      layer.style.clipPath = `inset(${clipTop}px 0 ${clipBottom}px 0)`;
      layer.style.visibility = clipTop + clipBottom >= w ? "hidden" : "visible";
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      layer.style.visibility = "hidden";
    };
  }, [travel, onScreen]);

  return (
    <GlobeCtx.Provider value={{ anchor, slot, end, travel }}>
      <div ref={wrapRef} className="relative isolate [--globe:min(45vw,40.5rem)]">
        {travel && (
          <div
            ref={layerRef}
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 -z-10 will-change-transform"
            style={{ visibility: "hidden" }}
          >
            {webgl ? <GlobeScene spin={spin} active={onScreen} /> : <Poster />}
          </div>
        )}
        {children}
      </div>
    </GlobeCtx.Provider>
  );
}

/** Ponto de partida do globo, em Serviços: à direita, sangrando pela borda. Só existe no desktop. */
export function GlobeAnchor() {
  const ctx = useContext(GlobeCtx);
  return (
    <div
      ref={ctx?.anchor}
      aria-hidden="true"
      className="pointer-events-none absolute top-6 right-0 hidden w-(--globe) aspect-square translate-x-[5%] lg:block"
    />
  );
}

/**
 * Lugar do globo em Sobre nós (onde era a foto). Durante a travessia fica vazio —
 * quem desenha é a camada fixa; sem travessia, mostra o SVG parado.
 */
export function GlobeSlot({ className }: { className?: string }) {
  const ctx = useContext(GlobeCtx);
  return (
    <div ref={ctx?.slot} aria-hidden="true" className={cn("relative aspect-square", className)}>
      {!ctx?.travel && <Poster />}
    </div>
  );
}

/**
 * Parada final, no fim da faixa preta do Trabalhe conosco (referência de 24/09):
 * o globo, maior, centrado embaixo do carrossel, aparece só como uma cúpula
 * cortada pela faixa branca. O corte vem do `overflow-hidden` da área (poster)
 * ou do fundo da faixa branca (camada fixa, que fica atrás dela).
 */
export function GlobeEnd({ className }: { className?: string }) {
  const ctx = useContext(GlobeCtx);
  return (
    <div ref={ctx?.end} aria-hidden="true" className={cn("aspect-square", className)}>
      {!ctx?.travel && <Poster />}
    </div>
  );
}
