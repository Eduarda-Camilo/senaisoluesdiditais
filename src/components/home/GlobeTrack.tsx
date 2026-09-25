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
 * Globo que atravessa Serviços → Parcerias → Sobre nós → Trabalhe conosco
 * (pedidos de 24 e 25/09).
 *
 * Um único globo 3D numa camada `fixed`, atrás do conteúdo das seções. A
 * posição dele sai de quatro marcadores no DOM, lidos a cada quadro:
 *
 * - `GlobeAnchor` (em Serviços): à direita, sangrando pela borda. O globo entra
 *   colado nele e, quando chega à altura em que vai esperar, fica parado na
 *   tela enquanto a lista de serviços rola.
 * - `GlobePartner` (em Parcerias, Figma 204:569): embaixo à esquerda, atrás do
 *   título e sangrando pela borda. Quando Parcerias entra, o globo desliza para
 *   lá (encolhendo um pouco) e pousa no instante em que a dobra prende; fica
 *   preso com ela enquanto a ilustração é montada.
 * - `GlobeSlot` (em Sobre nós, no lugar da foto): quando o Sobre entra, o globo
 *   sai de Parcerias (subindo com ela) e vai até o slot, que ele alcança no
 *   instante em que o quadro do Sobre prende.
 * - `GlobeEnd` (fim da faixa preta do Trabalhe conosco): quando o Sobre solta,
 *   o globo espera na mesma altura, depois desce para a direita crescendo e
 *   pousa como a cúpula atrás do "Vem ser FIESC", cortada pela faixa branca.
 *
 * Cada pouso é onde o marcador fica quando o quadro da seção prende
 * (`data-globe-frame`, o mesmo `top` que a seção calcula), então não há salto
 * vertical. A camada fica atrás do conteúdo e é recortada pela caixa das
 * seções: não aparece na cena de cases nem no Entre em contato. Por isso
 * Parcerias, o Sobre e a faixa preta do Trabalhe conosco não têm fundo próprio
 * (a faixa azul de Parcerias tem, e passa por cima dele, como no Figma).
 *
 * O scroll também gira o globo em volta do eixo. Nas travessias, posição e giro
 * são amortecidos, então o movimento é contínuo mesmo com a roda do mouse em
 * degraus. Quando o globo está preso a marcadores (a partida em Serviços, a
 * travessia Parcerias → Sobre, a cúpula), a altura segue os marcadores sem
 * atraso: amortecida, ela ficava para trás ao rolar de volta e o recorte do topo
 * da camada cortava o globo (bug de 25/09).
 *
 * Abaixo de `lg`, com prefers-reduced-motion ou sem WebGL, não há travessia: o
 * slot mostra o SVG parado, e Serviços e Parcerias ficam sem globo.
 */

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => <Poster /> });

type Register = (el: HTMLElement | null) => void;
type Ctx = { anchor: Register; partner: Register; slot: Register; end: Register; travel: boolean };
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
  const partnerRef = useRef<HTMLElement | null>(null);
  const slotRef = useRef<HTMLElement | null>(null);
  const endRef = useRef<HTMLElement | null>(null);
  const spin = useRef(0);
  const [onScreen, setOnScreen] = useState(false);

  const anchor = useCallback((el: HTMLElement | null) => {
    anchorRef.current = el;
  }, []);
  const partner = useCallback((el: HTMLElement | null) => {
    partnerRef.current = el;
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
    const pm = partnerRef.current;
    const b = slotRef.current;
    const c = endRef.current;
    if (!travel || !onScreen || !wrap || !layer || !a || !pm || !b || !c) return;
    const frame = b.closest<HTMLElement>("[data-globe-frame]");
    const pframe = pm.closest<HTMLElement>("[data-globe-frame]");
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
      const pr = pm.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      const wr = wrap.getBoundingClientRect();

      // Onde um marcador fica quando o quadro da seção dele prende (ver About.tsx
      // e Partners.tsx, que usam o mesmo `top`).
      const pinned = (m: DOMRect, fr: HTMLElement | null) =>
        fr ? Math.min(0, vh - fr.offsetHeight) + (m.top - fr.getBoundingClientRect().top) : m.top;
      const landP = pinned(pr, pframe);
      const landB = pinned(br, frame);

      // 1) Serviços → Parcerias: em Serviços o globo espera na altura em que
      // ficava antes (a do pouso no Sobre); quando Parcerias entra, desliza até o
      // marcador, mirando a altura de pouso (não o marcador, que ainda sobe).
      const tA = smoothstep((vh - pr.top) / Math.max(vh - landP, 1));
      // 2) Parcerias → Sobre: sai do marcador de Parcerias (que sobe com a seção)
      // e chega ao slot quando o quadro do Sobre prende.
      const tB = smoothstep((vh - br.top) / Math.max(vh - landB, 1));
      // 3) Sobre → Trabalhe conosco. Pouso = o fim da faixa preta encostado na base
      // da tela (o globo aparece só como a cúpula atrás do "Vem ser FIESC"). O
      // trajeto dura ~0,8 de tela de scroll: o globo sai da altura em que esperava
      // e desce até a cúpula enquanto vai para a direita e cresce.
      const land2 = band ? vh - (band.getBoundingClientRect().bottom - cr.top) : vh - cr.height * 0.2;
      const start2 = land2 + vh * 0.8;
      const t2 = smoothstep((start2 - cr.top) / Math.max(start2 - land2, 1));

      const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
      let tx: number;
      let ty: number;
      let size: number;
      // Preso a marcadores: segue sem amortecer a altura (ver o bug no topo).
      let attached = false;
      if (tA < 1) {
        const wait = Math.max(ar.top, landB);
        tx = lerp(ar.left, pr.left, tA);
        ty = lerp(wait, landP, tA);
        size = lerp(ar.width, pr.width, tA);
        attached = ar.top >= landB;
      } else if (tB < 1) {
        tx = lerp(pr.left, br.left, tB);
        ty = lerp(pr.top, Math.max(br.top, landB), tB);
        size = lerp(pr.width, br.width, tB);
        attached = true;
      } else {
        const hold = Math.max(br.top, landB);
        tx = lerp(br.left, cr.left, t2);
        // Mira a altura de pouso, não o marcador (que ainda sobe de baixo da tela):
        // assim o globo desce direto, sem passar do ponto e voltar.
        ty = t2 < 1 ? lerp(hold, land2, t2) : cr.top;
        attached = t2 >= 1;
        size = lerp(br.width, cr.width, t2);
      }

      if (x === null) {
        x = tx;
        y = ty;
      } else {
        const k = 1 - Math.exp(-dt * 14);
        x += (tx - x) * k;
        y = attached ? ty : y + (ty - y) * k;
      }

      spin.current = window.scrollY * 0.0015;

      w += (size - w) * (w ? 1 - Math.exp(-dt * 14) : 1);
      layer.style.width = `${w}px`;
      layer.style.height = `${w}px`;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      // Recorta na caixa das seções (a faixa branca do Trabalhe conosco já
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
    <GlobeCtx.Provider value={{ anchor, partner, slot, end, travel }}>
      <div ref={wrapRef} className="relative isolate [--globe:min(45vw,40.5rem)] [--globe-p:min(38vw,34.2rem)]">
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
 * Parada em Parcerias (Figma 204:569): 547px a 1440 (38vw), embaixo à esquerda
 * do título — o topo a 0,6 do tamanho abaixo do topo da coluna, e a borda
 * esquerda 207px para fora da tela (0,378 do tamanho + a margem do container).
 * Só existe no desktop; sem travessia, Parcerias fica sem globo.
 */
export function GlobePartner() {
  const ctx = useContext(GlobeCtx);
  return (
    <div
      ref={ctx?.partner}
      aria-hidden="true"
      className="pointer-events-none absolute top-[calc(var(--globe-p)*0.6)] left-[calc(var(--globe-p)*-0.378-3rem)] hidden w-(--globe-p) aspect-square lg:block"
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
