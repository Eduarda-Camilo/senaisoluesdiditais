import { awsJourney } from "@/content/partners";

/**
 * Ilustração da seção Parcerias — layout da equipe no Figma (204:569, 25/09):
 * três planos em losango empilhados — branco com o selo AWS Partner, laranja
 * SENAI a 70% e Azul Conectado a 70% — e, à direita, cada um ligado por uma
 * linha curta da sua cor ao título (Migrar e modernizar / Construir na nuvem /
 * Operar com DevOps). Geometria e sombras são as do Figma (losango 388 × 256,
 * 109,6 entre planos; sombra 0 46 14 preta a 30% nos dois de cima).
 *
 * Construída pelo scroll, **de cima para baixo**: o plano do selo primeiro,
 * depois o laranja, depois o azul. Em cada plano: o contorno é traçado a partir
 * do vértice esquerdo pelas duas arestas, guias verticais descem do plano de
 * cima (andaime — somem quando a superfície entra), a linha do título cresce e
 * o título sobe, a superfície e a sombra aparecem, e o traço recua para o tom
 * do plano. O selo entra por último no plano de cima. O estado final é o do
 * Figma.
 *
 * O componente só desenha; quem move é `applyJourney(root, p)`, chamado pela
 * seção a cada quadro com o progresso do scroll (0–1). Cada peça animada diz o
 * que fazer em atributos, para a coreografia ficar legível e fácil de ajustar:
 *
 *   data-l   plano (0 = o de cima … 2 = o de baixo)
 *   data-a   trecho do progresso local do plano, "início fim" (0–1)
 *   data-k   draw   traço sendo desenhado (pathLength=1 + dashoffset)
 *            fade   opacidade de 0 até `data-o` (padrão 1)
 *            dim    opacidade de 1 até `data-o` (recua)
 *            rise   opacidade + sobe 10px
 *            grow   cresce na horizontal a partir da esquerda
 *            plane  o plano assenta: desce de 16px acima até o lugar
 *
 * Cada plano ocupa 40% do progresso e começa 30% depois do anterior.
 * Pronta (`data-done`), os planos flutuam 3px (CSS, desligado com
 * prefers-reduced-motion).
 */

const W = 388.47;
const H = 255.57;
const GAP = 109.568;
const VB_H = GAP * 2 + H; // 474.7
const TOP = [0, GAP, GAP * 2];

const LAYER_START = [0, 0.3, 0.6];
const LAYER_LEN = 0.4;

type Pt = [number, number];
const f = (n: number) => n.toFixed(2);
const path = (pts: Pt[], close = false) =>
  pts.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join("") + (close ? "Z" : "");
const corners = (y: number) => ({
  l: [0, y + H / 2] as Pt,
  t: [W / 2, y] as Pt,
  r: [W, y + H / 2] as Pt,
  b: [W / 2, y + H] as Pt,
});

const draw = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1, fill: "none" } as const;

const LOOK = [
  { fill: "#ffffff", fillO: 1, stroke: "#ffffff", shadow: true },
  { fill: "#e84910", fillO: 0.7, stroke: "#e84910", shadow: true },
  { fill: "#ace9ff", fillO: 0.7, stroke: "#73daff", shadow: false },
];

export function AwsJourney({ className }: { className?: string }) {
  return (
    <div className={className} data-journey data-done="false">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${f(VB_H)}`} className="block h-auto w-[56%] overflow-visible sm:w-[54%]" aria-hidden="true">
          <defs>
            <filter id="journey-shadow" x="-10%" y="-10%" width="120%" height="160%">
              <feDropShadow dx="0" dy="45.85" stdDeviation="7.1" floodColor="#000000" floodOpacity="0.3" />
            </filter>
          </defs>
          {/* Pintura de baixo para cima (o de cima cobre os outros); a animação vai
              de cima para baixo — a ordem de desenho independe da do DOM. */}
          {[2, 1, 0].map((i) => (
            <Plane key={i} i={i} />
          ))}
        </svg>

        {/* Títulos: linha da cor do plano + nome, na altura do centro de cada losango. */}
        <ul className="absolute inset-y-0 right-0 left-[calc(56%+0.75rem)] sm:left-[calc(54%+1.5rem)]">
          {awsJourney.map((layer, i) => (
            <li
              key={layer.id}
              className="absolute inset-x-0 flex -translate-y-1/2 items-center gap-2.5 sm:gap-[2.1875rem]"
              style={{ top: `${(((TOP[i] + H / 2) / VB_H) * 100).toFixed(2)}%` }}
            >
              <span
                aria-hidden="true"
                data-l={i}
                data-k="grow"
                data-a="0.12 0.42"
                className="block h-0.5 w-5 shrink-0 origin-left sm:w-[3.0625rem]"
                style={{ backgroundColor: layer.line, transform: "scaleX(0)" }}
              />
              <span
                data-l={i}
                data-k="rise"
                data-a="0.2 0.5"
                style={{ opacity: 0 }}
                className="max-w-[11rem] font-display font-extrabold text-[0.8125rem] leading-[1.2] tracking-[-0.02em] sm:text-base"
              >
                {layer.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Plane({ i }: { i: number }) {
  const y = TOP[i];
  const { l, t, r, b } = corners(y);
  const look = LOOK[i];
  const above = i > 0 ? corners(TOP[i - 1]) : null;

  return (
    <g>
      {/* Andaime: guias descendo dos vértices do plano de cima até este. */}
      {above && (
        <g data-l={i} data-k="dim" data-a="0.45 0.75" data-o="0">
          {[
            [above.l, l],
            [above.r, r],
          ].map(([from, to], k) => (
            <path
              key={k}
              d={path([from, to])}
              stroke="#ffffff"
              strokeOpacity="0.35"
              strokeWidth="1"
              {...draw}
              data-l={i}
              data-k="draw"
              data-a="0 0.3"
            />
          ))}
        </g>
      )}

      <g data-l={i} data-k="plane" data-a="0 0.6" style={{ transform: "translateY(-16px)" }}>
        <g className="journey-float" style={{ animationDelay: `${-i * 1.6}s` }}>
          <g data-l={i} data-k="fade" data-a="0.4 0.72" style={{ opacity: 0 }}>
            <path
              d={path([l, t, r, b], true)}
              fill={look.fill}
              fillOpacity={look.fillO}
              filter={look.shadow ? "url(#journey-shadow)" : undefined}
            />
          </g>

          {i === 0 && (
            // Selo no plano, com a mesma transformação do Figma (retângulo 196 ×
            // 196 levado ao losango); `slice` recorta as laterais como o FILL de lá.
            <image
              href="/parcerias/aws-partner-select-tier.png"
              width="196.2"
              height="196.2"
              preserveAspectRatio="xMidYMid slice"
              transform="matrix(0.83205 0.5547 -0.83014 0.55756 193.87 19.01)"
              data-l={0}
              data-k="fade"
              data-a="0.62 0.92"
              style={{ opacity: 0 }}
            />
          )}

          {/* Contorno: duas metades saindo do vértice esquerdo; depois recua. */}
          <g stroke={look.stroke} strokeWidth="1.25" strokeLinejoin="round" data-l={i} data-k="dim" data-a="0.6 0.95" data-o="0">
            <path d={path([l, t, r])} {...draw} data-l={i} data-k="draw" data-a="0 0.45" />
            <path d={path([l, b, r])} {...draw} data-l={i} data-k="draw" data-a="0 0.45" />
          </g>
        </g>
      </g>
    </g>
  );
}

// ─── Coreografia ──────────────────────────────────────────────────────────

const smooth = (x: number) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

type Part = { el: HTMLElement | SVGElement; l: number; a0: number; a1: number; k: string; o: number };
const cache = new WeakMap<HTMLElement, Part[]>();

function parts(root: HTMLElement) {
  let list = cache.get(root);
  if (!list) {
    const found: Part[] = [];
    root.querySelectorAll<HTMLElement | SVGElement>("[data-k]").forEach((el) => {
      const [a0, a1] = (el.dataset.a ?? "0 1").split(" ").map(Number);
      found.push({
        el,
        l: Number(el.dataset.l ?? 0),
        a0,
        a1,
        k: el.dataset.k ?? "fade",
        o: el.dataset.o !== undefined ? Number(el.dataset.o) : 1,
      });
    });
    list = found;
    cache.set(root, list);
  }
  return list;
}

/** Aplica o estado da ilustração para o progresso `p` (0–1). */
export function applyJourney(root: HTMLElement, p: number) {
  for (const part of parts(root)) {
    const k = Math.min(Math.max((p - LAYER_START[part.l]) / LAYER_LEN, 0), 1);
    const t = smooth((k - part.a0) / Math.max(part.a1 - part.a0, 0.001));
    const s = part.el.style;
    switch (part.k) {
      case "draw":
        s.strokeDashoffset = String(1 - t);
        break;
      case "fade":
        s.opacity = String(t * part.o);
        break;
      case "dim":
        s.opacity = String(1 - t * (1 - part.o));
        break;
      case "rise":
        s.opacity = String(t);
        s.transform = `translateY(${((1 - t) * 10).toFixed(2)}px)`;
        break;
      case "grow":
        s.transform = `scaleX(${t.toFixed(4)})`;
        break;
      case "plane":
        s.transform = `translateY(${((t - 1) * 16).toFixed(2)}px)`;
        break;
    }
  }
  root.dataset.done = p >= 0.999 ? "true" : "false";
}
